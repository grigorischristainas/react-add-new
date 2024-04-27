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
            chalk.magenta.bold(`./${path}`) +
            chalk.cyan('...')
    )
}

export const logError = (
    err: string | unknown,
    type: ElementType = 'component'
) => {
    const errorToLog =
        typeof err === 'string'
            ? err
            : `Something went wrong during ${type} generation, please try again.`

    console.log(chalk.red(`\n${errorToLog}`))
}

export const logNewComponentSuccess = (type: ElementType = 'component') => {
    console.log(
        chalk.green(
            `\n${
                type === 'component' ? 'Component' : 'Context'
            } has been successfully created!`
        )
    )
    console.log(chalk.cyan('\nHappy coding 🎉'))
}
