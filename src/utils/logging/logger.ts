import chalk from 'chalk'
import { ElementType } from '../../lib/types'

export const logHi = () => {
    console.log(chalk.cyan('Hello from react-add-new! 👋'))
}

export const logNewComponentInit = (
    name: string,
    path: string,
    type: ElementType = 'component'
) => {
    console.log(
        chalk.cyan(`\n✨ Generating new ${type} `) +
            chalk.magenta.bold(`${name} `) +
            chalk.cyan('in ') +
            chalk.magenta.bold(`${path}`) +
            chalk.cyan('...')
    )
}

export const logError = (err: string, type: ElementType = 'component') => {
    console.log(chalk.red(`\n${err}`))
}

export const logNewComponentSuccess = (msg: string) => {
    console.log(chalk.green(`\n${msg}`))
    console.log(chalk.cyan('\nHappy coding 🎉'))
}
