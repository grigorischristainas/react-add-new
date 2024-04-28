import * as fs from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'
import createInteractive from './createInteractive'
import {
    contextFilePath,
    contextIndexFilePath,
    contextName,
    contextTypesPath,
    depthLimit,
    fileContainsContent,
    rootPath,
    sandboxDirName,
    targetDirectory,
} from '../../lib/mocks'
import {
    mockContextIndexTemplate,
    mockContextTemplate,
    mockContextTypesTemplate,
} from '../../templates/mocks/context'

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
    registerPrompt: jest.fn(),
}))

const mockedInquirerPrompt = inquirer.prompt as jest.MockedFunction<
    typeof inquirer.prompt
>

describe('createInteractive: Test that util', () => {
    beforeAll(() => {
        mockedInquirerPrompt.mockReturnValue(
            Promise.resolve({
                name: contextName,
                path: sandboxDirName,
            })
        )

        fs.rmSync(targetDirectory, { recursive: true, force: true })
    })

    beforeEach(() => {
        consoleLogMock.mockClear()
    })

    afterAll(() => {
        fs.rmSync(targetDirectory, { recursive: true, force: true })
    })

    it('should log successful messages', async () => {
        await createInteractive(depthLimit, rootPath)

        expect(consoleLogMock).toHaveBeenCalledTimes(2)

        expect(consoleLogMock).toHaveBeenCalledWith(
            chalk.green('\nContext has been successfully created!')
        )

        expect(consoleLogMock).toHaveBeenCalledWith(
            chalk.cyan('\nHappy coding 🎉')
        )
    })

    it('should create files correctly with correct content', async () => {
        expect(
            await fileContainsContent(
                contextIndexFilePath,
                mockContextIndexTemplate
            )
        ).toEqual(true)

        expect(
            await fileContainsContent(contextFilePath, mockContextTemplate)
        ).toEqual(true)

        expect(
            await fileContainsContent(
                contextTypesPath,
                mockContextTypesTemplate
            )
        ).toEqual(true)
    })

    it('should log error message when trying to create context in existing directory', async () => {
        await createInteractive(depthLimit, rootPath)

        expect(consoleLogMock).toHaveBeenCalledTimes(1)

        expect(consoleLogMock).toHaveBeenCalledWith(
            chalk.red(
                '\nLooks like component already exists, please try deleting its directory and try again.'
            )
        )
    })
})
