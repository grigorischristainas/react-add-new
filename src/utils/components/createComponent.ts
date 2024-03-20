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

const createComponent = async (
    componentName: string,
    relativeFolderPath: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const currentDirectory = process.cwd()
    const targetDirectory = path.join(relativeFolderPath, componentName)
    const folderPath = path.join(currentDirectory, targetDirectory)

    try {
        await componentExists(folderPath)
        await createDirectory(folderPath)

        const componentContent = replacePlaceholders(
            componentName,
            componentTemplate,
            noStyles,
            noTypes
        )

        await writeInDirectory(
            folderPath,
            componentName,
            'tsx',
            componentContent
        )

        const indexContent = replacePlaceholders(
            componentName,
            indexTemplate,
            noStyles,
            noTypes
        )

        await writeInDirectory(folderPath, 'index', 'ts', indexContent)

        if (!noTypes) {
            const typesContent = replacePlaceholders(
                componentName,
                typesTemplate,
                noStyles,
                noTypes
            )

            await writeInDirectory(folderPath, 'types', 'ts', typesContent)
        }

        if (!noStyles) {
            const stylesContent = replacePlaceholders(
                componentName,
                stylesTemplate,
                noStyles,
                noTypes
            )

            await writeInDirectory(
                folderPath,
                `${componentName}Styles`,
                'ts',
                stylesContent
            )
        }

        logNewComponentSuccess()
    } catch (err) {
        logError(err)
    }
}

export default createComponent
