import validateName from './validateName'

describe('validateName: Test that util', () => {
    it('will return true when passing a name that respects the naming rules', () => {
        expect(validateName('ValidName4')).toBe(true)
    })

    it('will return a string for invalid cases', async () => {
        expect(typeof validateName('with space')).toBe('string')
        expect(typeof validateName('withInv@lidCh@r@cters!')).toBe('string')
        expect(typeof validateName('5tartingWithNumber')).toBe('string')
    })
})
