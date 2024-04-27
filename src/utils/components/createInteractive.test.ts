import createInteractive from './createInteractive'
import * as fs from 'fs'
import chalk from 'chalk'
import {
    componentName,
    sandboxDirName,
    targetDirectory,
    fileContainsContent,
    componentFilePath,
    indexFilePath,
    stylesFilePath,
    typesPath,
    depthLimit,
    rootPath,
} from '../../lib/mocks'
import {
    mockComponentTemplateBasic,
    mockComponentTemplateFull,
    mockComponentTemplateNoStyles,
    mockComponentTemplateNoTypes,
    mockIndexTemplate,
    mockStylesTemplate,
    mockTypesTemplate,
} from '../../templates/mocks'
import inquirer from 'inquirer'

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
                name: componentName,
                path: sandboxDirName,
                withStyles: true,
                withTypes: true,
            })
        )
    })
    describe('With default extra arguments', () => {
        beforeAll(() => {
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
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', () => {
            expect(
                fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateFull
                )
            ).toEqual(true)

            expect(
                fileContainsContent(stylesFilePath, mockStylesTemplate)
            ).toEqual(true)

            expect(fileContainsContent(typesPath, mockTypesTemplate)).toEqual(
                true
            )
        })

        it('should log error message when trying to create component in existing directory', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(consoleLogMock).toHaveBeenCalledTimes(1)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.red(
                    '\nLooks like component already exists, please try deleting its directory and try again.'
                )
            )
        })
    })

    describe('With styles excluded', () => {
        beforeAll(() => {
            mockedInquirerPrompt.mockReturnValue(
                Promise.resolve({
                    name: componentName,
                    path: sandboxDirName,
                    withStyles: false,
                    withTypes: true,
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
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', () => {
            expect(
                fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateNoStyles
                )
            ).toEqual(true)

            expect(fs.existsSync(stylesFilePath)).toEqual(false)

            expect(fileContainsContent(typesPath, mockTypesTemplate)).toEqual(
                true
            )
        })

        it('should log error message when trying to create component in existing directory', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(consoleLogMock).toHaveBeenCalledTimes(1)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.red(
                    '\nLooks like component already exists, please try deleting its directory and try again.'
                )
            )
        })
    })

    describe('With types excluded', () => {
        beforeAll(() => {
            mockedInquirerPrompt.mockReturnValue(
                Promise.resolve({
                    name: componentName,
                    path: sandboxDirName,
                    withStyles: true,
                    withTypes: false,
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
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(
                fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateNoTypes
                )
            ).toEqual(true)

            expect(
                fileContainsContent(stylesFilePath, mockStylesTemplate)
            ).toEqual(true)

            expect(fs.existsSync(typesPath)).toEqual(false)
        })

        it('should log error message when trying to create component in existing directory', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(consoleLogMock).toHaveBeenCalledTimes(1)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.red(
                    '\nLooks like component already exists, please try deleting its directory and try again.'
                )
            )
        })
    })

    describe('With types and styles excluded', () => {
        beforeAll(() => {
            mockedInquirerPrompt.mockReturnValue(
                Promise.resolve({
                    name: componentName,
                    path: sandboxDirName,
                    withStyles: false,
                    withTypes: false,
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
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(
                fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateBasic
                )
            ).toEqual(true)

            expect(fs.existsSync(stylesFilePath)).toEqual(false)

            expect(fs.existsSync(typesPath)).toEqual(false)
        })

        it('should log error message when trying to create component in existing directory', async () => {
            await createInteractive(depthLimit, rootPath)

            expect(consoleLogMock).toHaveBeenCalledTimes(1)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.red(
                    '\nLooks like component already exists, please try deleting its directory and try again.'
                )
            )
        })
    })
})
