import { Command } from 'commander'
import { logNewComponentInit } from '../logging/logger'
import createInteractive from './createInteractive'
import createContext from './createContext'
import handleCreateStatus from '../logging/handleCreateStatus'

export type HandleContextCreationProps = {
    path: string | undefined
    name: string | undefined
    interactive: boolean | undefined
    depthLimit: number | undefined
    program: Command
    rootPath: string | undefined
}

const handleContextCreation = async ({
    path,
    name,
    interactive,
    depthLimit,
    program,
    rootPath,
}: HandleContextCreationProps) => {
    if (interactive) {
        await createInteractive(depthLimit, rootPath)
        return
    }

    if (name && path) {
        logNewComponentInit(name, path, 'context')
        const createStatus = await createContext(name, path)

        handleCreateStatus(createStatus)

        return
    }

    program.error(
        'Please provide command line arguments or -i option for entering interactive mode. For help please run command with -h argument.'
    )
}

export default handleContextCreation
