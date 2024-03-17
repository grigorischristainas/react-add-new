import * as path from 'path'
import componentExists from './componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import componentTemplate from '../../templates/component'
import indexTemplate from '../../templates'
import typesTemplate from '../../templates/types'
import stylesTemplate from '../../templates/styles'
import formatContent from './formatContent'

const createComponent = (
    componentName: string,
    relativeFolderPath: string,
    withStyles: boolean,
    withTypes: boolean
) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    componentExists(folderPath)
        .then(() => createDirectory(folderPath))
        // Write component file
        .then(() => {
            const content = formatContent(
                componentName,
                componentTemplate,
                withStyles,
                withTypes
            )
            return writeInDirectory(folderPath, componentName, 'tsx', content)
        })
        // Write index file
        .then(() => {
            const content = formatContent(
                componentName,
                indexTemplate,
                withStyles,
                withTypes
            )
            return writeInDirectory(folderPath, 'index', 'ts', content)
        })
        // Write types file
        .then(() => {
            if (withTypes) {
                const content = formatContent(
                    componentName,
                    typesTemplate,
                    withStyles,
                    withTypes
                )
                return writeInDirectory(folderPath, 'types', 'ts', content)
            }
        })
        // Write styles file
        .then(() => {
            if (withStyles) {
                const content = formatContent(
                    componentName,
                    stylesTemplate,
                    withStyles,
                    withTypes
                )
                return writeInDirectory(
                    folderPath,
                    `${componentName}Styles`,
                    'ts',
                    content
                )
            }
        })
        // Log success message
        .then(() => logNewComponentSuccess())
        // Catch & log any errors
        .catch((err) => logError(err))
}

export default createComponent
