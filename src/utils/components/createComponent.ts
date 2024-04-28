import * as path from 'path'
import componentExists from '../files/componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import getTemplates from '../files/getTemplates'
import getFileNames from '../files/getFileNames'

const createComponent = async (
    componentName: string,
    relativeFolderPath: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    const templates = getTemplates(
        componentName,
        'component',
        noStyles,
        noTypes
    )
    const fileNames = getFileNames(componentName)

    try {
        await componentExists(folderPath)
        await createDirectory(folderPath)

        await writeInDirectory(
            folderPath,
            fileNames.component,
            templates.component
        )

        await writeInDirectory(folderPath, fileNames.index, templates.index)

        if (!noTypes) {
            await writeInDirectory(folderPath, fileNames.types, templates.types)
        }

        if (!noStyles) {
            await writeInDirectory(
                folderPath,
                fileNames.styles,
                templates?.styles
            )
        }

        logNewComponentSuccess()
    } catch (err) {
        logError(err)
    }
}

export default createComponent
