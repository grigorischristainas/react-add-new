import { Command } from 'commander'
import { logError, logHi, logNewComponentInit } from '../logging/logger'
import createComponent from '../components/createComponent'
import chalk from 'chalk'

const initializeCommands = () => {
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
        .requiredOption('-n, --name <string>', 'Component name')
        .requiredOption(
            '-p, --path <string>',
            'Component path, relative to current command execution path'
        )
        .option('--noTypes', 'Exclude types file from generation', false)
        .option('--noStyles', 'Exclude styles file from generation', false)
        .action(({ path, name, noStyles, noTypes }) => {
            logNewComponentInit(name, path)
            createComponent(name, path, noStyles, noTypes)
        })

    program.configureOutput({
        outputError: (str, write) => write(chalk.red(`\n${str}`)),
    })

    program.parse()
}

export default initializeCommands
