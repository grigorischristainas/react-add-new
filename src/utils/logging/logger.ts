import chalk from 'chalk'

export const logHi = () => {
    console.log(chalk.cyan('Hello from react-add-new! 👋'))
}

export const logNewComponentInit = (name: string, path: string) => {
    console.log(
        chalk.cyan(`✨ Generating new component `) +
            chalk.magenta.bold(`${name} `) +
            chalk.cyan('in ') +
            chalk.magenta.bold(`./${path}`) +
            chalk.cyan('...')
    )
}

export const logError = (err: string | unknown) => {
    const errorToLog =
        typeof err === 'string'
            ? err
            : 'Something went wrong during component generation, please try again.'

    console.log(chalk.red(`\n${errorToLog}`))
}

export const logNewComponentSuccess = () => {
    console.log(chalk.green('\nComponent has been successfully created!'))
    console.log(chalk.cyan('\nHappy coding 🎉'))
}
