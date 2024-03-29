import inquirer from 'inquirer'
import { logError } from '../logging/logger'
import createComponent from './createComponent'

type Answer = {
    name: string
    path: string
    withStyles: boolean
    withTypes: boolean
}

const createInteractive = () => {
    inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

    inquirer
        .prompt([
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
                excludeFilter: (nodePath: string) => nodePath.startsWith('.'),
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
        .then(({ name, path, withStyles, withTypes }: Answer) => {
            createComponent(name, path, !withStyles, !withTypes)
        })
        .catch((error) => {
            if (error.isTtyError) {
                logError(
                    'Prompt could not be rendered in the current environment.'
                )
            } else {
                logError(
                    'Something went wrong during component generation, please try again.'
                )
            }
        })
}

export default createInteractive
