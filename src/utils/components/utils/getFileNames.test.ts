import getFileNames, { FileNames } from './getFileNames'

describe('getFileNames: Test that util', () => {
    it('should return correct values', () => {
        const result = getFileNames('TestComponent')

        const expectedResult: FileNames = {
            component: 'TestComponent.tsx',
            index: 'index.ts',
            styles: 'TestComponentStyles.ts',
            types: 'types.ts',
        }

        expect(result).toEqual(expectedResult)
    })
})
