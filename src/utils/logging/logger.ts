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

export const logError = (err: string) => {
    console.log(chalk.red(err))
}

export const logNewComponentSuccess = () => {
    console.log(chalk.green('\nComponent has been successfully created!'))
    console.log(chalk.cyan('\nHappy coding 🎉'))
}
