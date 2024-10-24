import * as path from 'path'
import componentExists from '../files/componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import getTemplates from '../files/getTemplates'
import getFileNames from '../files/getFileNames'
import { CreateStatus } from '../../lib/types'

const createContext = async (
    componentName: string,
    contextPath: string
): Promise<CreateStatus> => {
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

        return { status: 'OK', msg: 'Context has been successfully created!' }
    } catch (err) {
        return {
            status: 'ERR',
            msg:
                typeof err === 'string'
                    ? err
                    : `Something went wrong during context generation, please try again.`,
        }
    }
}

export default createContext
