import * as fs from 'fs'
import {
    contextFilePath,
    contextIndexFilePath,
    contextName,
    contextTypesPath,
    fileContainsContent,
    sandboxDirName,
    targetDirectory,
} from '../../lib/mocks'
import createContext from './createContext'
import {
    mockContextIndexTemplate,
    mockContextTemplate,
    mockContextTypesTemplate,
} from '../../templates/mocks/context'

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()

describe('createComponent: Test that util', () => {
    describe('With default extra arguments', () => {
        beforeAll(async () => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })

            await createContext(contextName, sandboxDirName)
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
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
    })
})
