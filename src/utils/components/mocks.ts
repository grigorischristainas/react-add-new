import * as path from 'path'
import * as fs from 'fs'

export const depthLimit = undefined

export const componentName = 'TestComponent'

export const indexFilename = 'index.ts'

export const componentFileName = 'TestComponent.tsx'

export const stylesFileName = 'TestComponentStyles.ts'

export const typesFileName = 'types.ts'

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

export const fileContainsContent = (
    filePath: string,
    expectedContent: string
) => {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return fileContent.trim() === expectedContent.trim()
}
