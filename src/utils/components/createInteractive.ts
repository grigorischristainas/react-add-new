import inquirer from 'inquirer'
import { logError } from '../logging/logger'
import createComponent from './createComponent'

type Answer = {
    name: string
    path: string
    withStyles: boolean
    withTypes: boolean
}

const createInteractive = async () => {
    inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
    try {
        const { name, path, withStyles, withTypes }: Answer =
            await inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is your component name?',
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
                    depthLimit: 5,
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

        await createComponent(name, path, !withStyles, !withTypes)
    } catch (error) {
        logError(
            'Something went wrong during component generation, please try again.'
        )
    }
}

export default createInteractive
