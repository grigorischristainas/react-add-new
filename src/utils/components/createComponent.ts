import * as path from 'path'
import componentExists from './componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import componentTemplate from '../../templates/component'
import indexTemplate from '../../templates'
import typesTemplate from '../../templates/types'
import stylesTemplate from '../../templates/styles'

const createComponent = (componentName: string, relativeFolderPath: string) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    componentExists(folderPath)
        .then(() => createDirectory(folderPath))
        // Write component file
        .then(() =>
            writeInDirectory(
                folderPath,
                componentName,
                componentName,
                'tsx',
                componentTemplate
            )
        )
        // Write index file
        .then(() =>
            writeInDirectory(
                folderPath,
                'index',
                componentName,
                'ts',
                indexTemplate
            )
        )
        // Write types file
        .then(() =>
            writeInDirectory(
                folderPath,
                'types',
                componentName,
                'ts',
                typesTemplate
            )
        )
        // Write styles file
        .then(() =>
            writeInDirectory(
                folderPath,
                `${componentName}Styles`,
                componentName,
                'ts',
                stylesTemplate
            )
        )
        // Log success message
        .then(() => logNewComponentSuccess())
        // Catch & log any errors
        .catch((err) => logError(err))
}

export default createComponent
