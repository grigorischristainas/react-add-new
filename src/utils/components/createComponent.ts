import * as path from 'path'
import componentExists from './componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import getTemplates from './getTemplates'

const createComponent = async (
    componentName: string,
    relativeFolderPath: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    const templates = getTemplates(componentName, noStyles, noTypes)

    try {
        await componentExists(folderPath)
        await createDirectory(folderPath)

        await writeInDirectory(
            folderPath,
            componentName,
            'tsx',
            templates.component
        )

        await writeInDirectory(folderPath, 'index', 'ts', templates.index)

        if (!noTypes) {
            await writeInDirectory(folderPath, 'types', 'ts', templates.types)
        }

        if (!noStyles) {
            await writeInDirectory(
                folderPath,
                `${componentName}Styles`,
                'ts',
                templates.styles
            )
        }

        logNewComponentSuccess()
    } catch (err) {
        logError(err)
    }
}

export default createComponent
