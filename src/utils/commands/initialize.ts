import { Command } from 'commander'
import { logHi, logNewComponentInit } from '../logging/logger'
import createComponent from '../components/createComponent'

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
        .requiredOption('-n, --name <string>', 'name')
        .requiredOption('-p, --path <string>', 'path')
        .action(({ path, name }) => {
            logNewComponentInit(name, path)
            createComponent(name, path)
        })

    program.parse()
}

export default initializeCommands
