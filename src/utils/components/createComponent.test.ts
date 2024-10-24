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
import {
    componentName,
    sandboxDirName,
    targetDirectory,
    fileContainsContent,
    componentFilePath,
    indexFilePath,
    stylesFilePath,
    typesPath,
} from '../../lib/mocks'

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()

describe('createComponent: Test that util', () => {
    describe('With default extra arguments', () => {
        beforeAll(async () => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
            await createComponent(componentName, sandboxDirName, false, false)
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should create files correctly with correct content', async () => {
            expect(
                await fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                await fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateFull
                )
            ).toEqual(true)

            expect(
                await fileContainsContent(stylesFilePath, mockStylesTemplate)
            ).toEqual(true)

            expect(
                await fileContainsContent(typesPath, mockTypesTemplate)
            ).toEqual(true)
        })
    })

    describe('With styles excluded', () => {
        beforeAll(async () => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
            await createComponent(componentName, sandboxDirName, true, false)
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should create files correctly with correct content', async () => {
            expect(
                await fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                await fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateNoStyles
                )
            ).toEqual(true)

            expect(fs.existsSync(stylesFilePath)).toEqual(false)

            expect(
                await fileContainsContent(typesPath, mockTypesTemplate)
            ).toEqual(true)
        })
    })

    describe('With types excluded', () => {
        beforeAll(async () => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
            await createComponent(componentName, sandboxDirName, false, true)
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should create files correctly with correct content', async () => {
            expect(
                await fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                await fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateNoTypes
                )
            ).toEqual(true)

            expect(
                await fileContainsContent(stylesFilePath, mockStylesTemplate)
            ).toEqual(true)

            expect(fs.existsSync(typesPath)).toEqual(false)
        })
    })

    describe('With types and styles excluded', () => {
        beforeAll(async () => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
            await createComponent(componentName, sandboxDirName, true, true)
        })

        beforeEach(() => {
            consoleLogMock.mockClear()
        })

        afterAll(() => {
            fs.rmSync(targetDirectory, { recursive: true, force: true })
        })

        it('should create files correctly with correct content', async () => {
            expect(
                await fileContainsContent(indexFilePath, mockIndexTemplate)
            ).toEqual(true)

            expect(
                await fileContainsContent(
                    componentFilePath,
                    mockComponentTemplateBasic
                )
            ).toEqual(true)

            expect(fs.existsSync(stylesFilePath)).toEqual(false)

            expect(fs.existsSync(typesPath)).toEqual(false)
        })
    })
})
