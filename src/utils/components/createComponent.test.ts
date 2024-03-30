import * as fs from 'fs'
import {
    mockComponentTemplateBasic,
    mockComponentTemplateFull,
    mockComponentTemplateNoStyles,
    mockComponentTemplateNoTypes,
    mockIndexTemplate,
    mockStylesTemplate,
    mockTypesTemplate,
} from '../../templates/mocks'
import createComponent from './createComponent'
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
} from './mocks'

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()

describe('createComponent: Test that util', () => {
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
            await createComponent(componentName, sandboxDirName, false, false)

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
            await createComponent(componentName, sandboxDirName, false, false)

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
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should log successful messages', async () => {
            await createComponent(componentName, sandboxDirName, true, false)

            expect(consoleLogMock).toHaveBeenCalledTimes(2)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', async () => {
            await createComponent(componentName, sandboxDirName, true, false)

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
            await createComponent(componentName, sandboxDirName, false, false)

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
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should log successful messages', async () => {
            await createComponent(componentName, sandboxDirName, false, true)

            expect(consoleLogMock).toHaveBeenCalledTimes(2)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', async () => {
            await createComponent(componentName, sandboxDirName, false, true)

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
            await createComponent(componentName, sandboxDirName, false, false)

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
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should log successful messages', async () => {
            await createComponent(componentName, sandboxDirName, true, true)

            expect(consoleLogMock).toHaveBeenCalledTimes(2)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.green('\nComponent has been successfully created!')
            )

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.cyan('\nHappy coding 🎉')
            )
        })

        it('should create files correctly with correct content', async () => {
            await createComponent(componentName, sandboxDirName, true, true)

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
            await createComponent(componentName, sandboxDirName, false, false)

            expect(consoleLogMock).toHaveBeenCalledTimes(1)

            expect(consoleLogMock).toHaveBeenCalledWith(
                chalk.red(
                    '\nLooks like component already exists, please try deleting its directory and try again.'
                )
            )
        })
    })
})
