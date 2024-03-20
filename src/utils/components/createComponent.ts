import * as path from 'path'
import componentExists from './componentExists'
import createDirectory from '../files/createDirectory'
import writeInDirectory from '../files/writeInDirectory'
import { logError, logNewComponentSuccess } from '../logging/logger'
import componentTemplate from '../../templates/component'
import indexTemplate from '../../templates'
import typesTemplate from '../../templates/types'
import stylesTemplate from '../../templates/styles'
import replacePlaceholders from './replacePlaceholders'

const createComponent = (
    componentName: string,
    relativeFolderPath: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    componentExists(folderPath)
        .then(() => createDirectory(folderPath))
        // Write component file
        .then(() => {
            const content = replacePlaceholders(
                componentName,
                componentTemplate,
                noStyles,
                noTypes
            )

            return writeInDirectory(folderPath, componentName, 'tsx', content)
        })
        // Write index file
        .then(() => {
            const content = replacePlaceholders(
                componentName,
                indexTemplate,
                noStyles,
                noTypes
            )

            return writeInDirectory(folderPath, 'index', 'ts', content)
        })
        // Write types file
        .then(() => {
            if (noTypes) return

            const content = replacePlaceholders(
                componentName,
                typesTemplate,
                noStyles,
                noTypes
            )

            return writeInDirectory(folderPath, 'types', 'ts', content)
        })
        // Write styles file
        .then(() => {
            if (noStyles) return

            const content = replacePlaceholders(
                componentName,
                stylesTemplate,
                noStyles,
                noTypes
            )

            return writeInDirectory(
                folderPath,
                `${componentName}Styles`,
                'ts',
                content
            )
        })
        // Log success message
        .then(() => logNewComponentSuccess())
        // Catch & log any errors
        .catch((err) => logError(err))
}

export default createComponent
