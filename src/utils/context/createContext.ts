import * as path from 'path'
import componentExists from '../files/componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import getTemplates from '../files/getTemplates'
import getFileNames from '../files/getFileNames'

const createContext = async (componentName: string, contextPath: string) => {
    const folderPath = path.resolve(contextPath, componentName)

    const templates = getTemplates(componentName, 'context')
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

        await writeInDirectory(folderPath, fileNames.types, templates.types)

        logNewComponentSuccess('context')
    } catch (err) {
        logError(err)
    }
}

export default createContext
