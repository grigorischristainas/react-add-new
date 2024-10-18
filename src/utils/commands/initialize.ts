import { Command } from 'commander'
import { logHi } from '../logging/logger'
import chalk from 'chalk'
import handleComponentCreation from '../components/handleComponentCreation'
import depthLimitParser from './depthLimitParser'
import handleContextCreation from '../context/handleContextCreation'

const initialize = () => {
    const program = new Command()

    program
        .name('react-add-new')
        .description('A CLI tool to create new React components and hooks')
        .version('0.1.0')

    program
        .command('hi')
        .description('Just say hi 👋')
        .action(() => {
            logHi()
        })

    program
        .command('component')
        .description('Generate new component ✨')
        .option('-n, --name <string>', 'Component name [non-interactive mode]')
        .option(
            '-p, --path <string>',
            'Component path to place the new component [non-interactive mode]'
        )
        .option(
            '--noTypes',
            'Exclude types file from generation [non-interactive mode]',
            false
        )
        .option(
            '--noStyles',
            'Exclude styles file from generation [non-interactive mode]',
            false
        )
        .option(
            '-i, --interactive',
            'Enter interactive mode, all other arguments are ignored.',
            false
        )
        .option(
            '-depthLimit, --depthLimit <number>',
            'Maximum directory depth limit to search for providing directory generation suggestions [interactive mode]',
            depthLimitParser
        )
        .option(
            '-rootPath, --rootPath <string>',
            'Root search directory e.g., src/',
            undefined
        )
        .action(
            ({
                path,
                name,
                noStyles,
                noTypes,
                interactive,
                depthLimit,
                rootPath,
            }) => {
                if (depthLimit !== undefined && isNaN(depthLimit)) {
                    program.error(
                        'Please provide a valid argument for depth limit'
                    )
                }

                handleComponentCreation({
                    name,
                    path,
                    noStyles,
                    noTypes,
                    interactive,
                    depthLimit,
                    program,
                    rootPath,
                })
            }
        )

    program
        .command('context')
        .description('Generate new context ✨')
        .option('-n, --name <string>', 'Context name [non-interactive mode]')
        .option(
            '-p, --path <string>',
            'Context path, to place the new context [non-interactive mode]'
        )
        .option(
            '-i, --interactive',
            'Enter interactive mode, all other arguments are ignored.',
            false
        )
        .option(
            '-depthLimit, --depthLimit <number>',
            'Maximum directory depth limit to search for providing component path generation options [interactive mode]',
            depthLimitParser
        )
        .option(
            '-rootPath, --rootPath <string>',
            'Root search directory e.g., src/',
            undefined
        )
        .action(({ path, name, interactive, depthLimit, rootPath }) => {
            if (depthLimit !== undefined && isNaN(depthLimit)) {
                program.error('Please provide a valid argument for depth limit')
            }

            handleContextCreation({
                name,
                path,
                interactive,
                depthLimit,
                program,
                rootPath,
            })
        })

    program.configureOutput({
        outputError: (str, write) => write(chalk.red(`\n${str}`)),
    })

    program.parse()
}

export default initialize
