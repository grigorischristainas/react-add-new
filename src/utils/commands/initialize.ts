import { Command } from 'commander'
import { logHi } from '../logging/logger'
import chalk from 'chalk'
import handleComponentCreation from '../components/handleComponentCreation'

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
            'Component path, relative to current command execution path [non-interactive mode]'
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
            'Enter interactive mode, all other arguments are ignored.'
        )
        .action(({ path, name, noStyles, noTypes, interactive }) => {
            handleComponentCreation({
                name,
                path,
                noStyles,
                noTypes,
                interactive,
                program,
            })
        })

    program.configureOutput({
        outputError: (str, write) => write(chalk.red(`\n${str}`)),
    })

    program.parse()
}

export default initialize
