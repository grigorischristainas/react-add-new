import { Command } from 'commander'
import { logNewComponentInit } from '../logging/logger'
import createComponent from './createComponent'
import createInteractive from './createInteractive'

export type HandleComponentCreationProps = {
    path: string
    name: string
    noStyles: boolean
    noTypes: boolean
    interactive: boolean
    program: Command
}

const handleComponentCreation = ({
    path,
    name,
    noStyles,
    noTypes,
    interactive,
    program,
}: HandleComponentCreationProps) => {
    if ((!path || !name) && !interactive) {
        program.error(
            'Please provide command line arguments or -i option for entering interactive mode. For help please run command with -h argument.'
        )
    }

    if (interactive) {
        createInteractive()
    } else {
        logNewComponentInit(name, path)
        createComponent(name, path, noStyles, noTypes)
    }
}

export default handleComponentCreation
