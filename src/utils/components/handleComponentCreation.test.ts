import { Command } from 'commander'
import handleComponentCreation from './handleComponentCreation'
import createInteractive from './createInteractive'
import createComponent from './createComponent'
import {
    componentName,
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

jest.mock('./createComponent')
const mockedCreateComponent = createComponent as jest.MockedFunction<
    typeof createComponent
>

describe('handleComponentCreation: Test that util', () => {
    beforeAll(() => {
        mockedCreateComponent.mockResolvedValue({ status: 'OK', msg: '' })
    })

    it('should log error if no correct arguments are passed', () => {
        const newProgram = new Command()
        const mockedProgram = jest.mocked(newProgram)

        handleComponentCreation({
            path: undefined,
            name: undefined,
            interactive: false,
            noStyles: false,
            noTypes: false,
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
            noStyles: false,
            noTypes: false,
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
            name: componentName,
            interactive: false,
            noStyles: false,
            noTypes: false,
            depthLimit,
            program: mockedProgram,
            rootPath,
        })

        expect(mockedProgram.error).not.toHaveBeenCalled()
        expect(mockedCreateComponent).toHaveBeenCalled()
    })
})
