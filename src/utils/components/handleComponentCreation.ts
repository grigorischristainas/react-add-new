import { Command } from 'commander'
import { logNewComponentInit } from '../logging/logger'
import createComponent from './createComponent'
import createInteractive from './createInteractive'

export type HandleComponentCreationProps = {
    path: string | undefined
    name: string | undefined
    noStyles: boolean
    noTypes: boolean
    interactive: boolean | undefined
    depthLimit: number | undefined
    program: Command
    rootPath: string | undefined
}

const handleComponentCreation = async ({
    path,
    name,
    noStyles,
    noTypes,
    interactive,
    depthLimit,
    program,
    rootPath,
}: HandleComponentCreationProps) => {
    if (interactive) {
        await createInteractive(depthLimit, rootPath)
        return
    }

    if (name && path) {
        logNewComponentInit(name, path)
        await createComponent(name, path, noStyles, noTypes)
        return
    }

    program.error(
        'Please provide command line arguments or -i option for entering interactive mode. For help please run command with -h argument.'
    )
}

export default handleComponentCreation
