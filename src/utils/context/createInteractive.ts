import inquirer from 'inquirer'
import { logError } from '../logging/logger'
import createContext from './createContext'

type Answer = {
    name: string
    path: string
}

const createInteractive = async (
    depthLimit: number | undefined,
    rootPath: string | undefined
) => {
    inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
    try {
        const { name, path }: Answer = await inquirer.prompt([
            {
                name: 'name',
                message: 'What is your context name? (e.g., MySuperContext)',
            },
            {
                type: 'fuzzypath',
                name: 'path',
                excludePath: (nodePath: string) =>
                    nodePath.startsWith('node_modules') ||
                    nodePath.startsWith('dist'),
                excludeFilter: (nodePath: string) => nodePath.startsWith('.'),
                message: 'Select a target directory for your context:',
                suggestOnly: true,
                depthLimit: depthLimit,
                itemType: 'directory',
                rootPath: rootPath,
            },
        ])

        await createContext(name, path)
    } catch (error) {
        logError(
            'Something went wrong during context generation, please try again.'
        )
    }
}

export default createInteractive
