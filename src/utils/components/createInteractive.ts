import inquirer from 'inquirer'
import { logError, logNewComponentSuccess } from '../logging/logger'
import createComponent from './createComponent'
import validateName from '../validators/validateName'
import handleCreateStatus from '../logging/handleCreateStatus'

type Answer = {
    name: string
    path: string
    withStyles: boolean
    withTypes: boolean
}

const createInteractive = async (
    depthLimit: number | undefined,
    rootPath: string | undefined
) => {
    inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
    try {
        const { name, path, withStyles, withTypes }: Answer =
            await inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is your component name?',
                    validate: (input: string) => validateName(input),
                },
                {
                    type: 'fuzzypath',
                    name: 'path',
                    excludePath: (nodePath: string) =>
                        nodePath.startsWith('node_modules') ||
                        nodePath.startsWith('dist'),
                    excludeFilter: (nodePath: string) =>
                        nodePath.startsWith('.'),
                    message: 'Select a target directory for your component:',
                    suggestOnly: true,
                    depthLimit: depthLimit,
                    itemType: 'directory',
                    rootPath: rootPath,
                },
                {
                    name: 'withStyles',
                    type: 'confirm',
                    message: 'Add styles?',
                },
                {
                    name: 'withTypes',
                    type: 'confirm',
                    message: 'Add types?',
                },
            ])

        const createStatus = await createComponent(
            name,
            path,
            !withStyles,
            !withTypes
        )

        handleCreateStatus(createStatus)
    } catch (error) {
        logError(
            'Something went wrong during component generation, please try again.'
        )
    }
}

export default createInteractive
