import * as path from 'path'
import * as fs from 'fs'
import prettier from 'prettier'

export const depthLimit = undefined

export const rootPath = undefined

// Common
export const indexFilename = 'index.ts'

export const typesFileName = 'types.ts'

// Component
export const componentName = 'TestComponent'

export const componentFileName = 'TestComponent.tsx'

export const stylesFileName = 'TestComponentStyles.ts'

export const sandboxDirName = 'sandbox'

export const currentDirectory = process.cwd()

export const targetDirectory = path.join(currentDirectory, sandboxDirName)

export const componentDirectory = path.join(targetDirectory, componentName)

export const indexFilePath = path.join(componentDirectory, indexFilename)

export const componentFilePath = path.join(
    componentDirectory,
    componentFileName
)

export const stylesFilePath = path.join(componentDirectory, stylesFileName)

export const typesPath = path.join(componentDirectory, typesFileName)

// Context
export const contextName = 'MySuperContext'

export const contextFileName = 'MySuperContext.tsx'

export const contextDirectory = path.join(targetDirectory, contextName)

export const contextIndexFilePath = path.join(contextDirectory, indexFilename)

export const contextFilePath = path.join(contextDirectory, contextFileName)

export const contextTypesPath = path.join(contextDirectory, typesFileName)

export const fileContainsContent = async (
    filePath: string,
    expectedContent: string
) => {
    const fileContent = fs.readFileSync(filePath, 'utf8')

    const prettifiedInput = await prettier.format(fileContent, {
        parser: 'babel-ts',
    })

    const prettifiedExpected = await prettier.format(expectedContent, {
        parser: 'babel-ts',
    })

    return prettifiedInput.trim() === prettifiedExpected.trim()
}
