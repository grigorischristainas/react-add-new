import { Command } from 'commander'
import handleComponentCreation from './handleContextCreation'
import createInteractive from './createInteractive'
import createComponent from './createContext'
import {
    contextName,
    depthLimit,
    sandboxDirName,
    rootPath,
} from '../../lib/mocks'

jest.spyOn(console, 'log').mockImplementation()

jest.mock('commander')

jest.mock('./createInteractive')
const mockedCreateInteractive = createInteractive as jest.MockedFunction<
    typeof createInteractive
>

jest.mock('./createContext')
const mockedCreateContext = createComponent as jest.MockedFunction<
    typeof createComponent
>

describe('handleComponentCreation: Test that util', () => {
    beforeAll(() => {
        mockedCreateContext.mockResolvedValue({ status: 'OK', msg: '' })
    })

    it('should log error if no correct arguments are passed', () => {
        const newProgram = new Command()
        const mockedProgram = jest.mocked(newProgram)

        handleComponentCreation({
            path: undefined,
            name: undefined,
            interactive: false,
            depthLimit,
            program: mockedProgram,
            rootPath,
        })

        expect(mockedProgram.error).toHaveBeenCalledTimes(1)

        expect(mockedProgram.error).toHaveBeenLastCalledWith(
            'Please provide command line arguments or -i option for entering interactive mode. For help please run command with -h argument.'
        )
    })

    it('should call correct function for interactive', () => {
        const newProgram = new Command()
        const mockedProgram = jest.mocked(newProgram)

        handleComponentCreation({
            path: undefined,
            name: undefined,
            interactive: true,
            depthLimit,
            program: mockedProgram,
            rootPath,
        })

        expect(mockedProgram.error).not.toHaveBeenCalled()
        expect(mockedCreateInteractive).toHaveBeenCalled()
    })

    it('should call correct function for non-interactive', () => {
        const newProgram = new Command()
        const mockedProgram = jest.mocked(newProgram)

        handleComponentCreation({
            path: sandboxDirName,
            name: contextName,
            interactive: false,
            depthLimit,
            program: mockedProgram,
            rootPath,
        })

        expect(mockedProgram.error).not.toHaveBeenCalled()
        expect(mockedCreateContext).toHaveBeenCalled()
    })
})
