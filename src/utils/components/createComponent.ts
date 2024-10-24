import * as path from 'path'
import componentExists from '../files/componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import getTemplates from '../files/getTemplates'
import getFileNames from '../files/getFileNames'
import { CreateStatus } from '../../lib/types'

const createComponent = async (
    componentName: string,
    componentPath: string,
    noStyles: boolean,
    noTypes: boolean
): Promise<CreateStatus> => {
    const folderPath = path.resolve(componentPath, componentName)

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

        return { status: 'OK', msg: 'Component has been successfully created!' }
    } catch (err) {
        return {
            status: 'ERR',
            msg:
                typeof err === 'string'
                    ? err
                    : `Something went wrong during component generation, please try again.`,
        }
    }
}

export default createComponent
