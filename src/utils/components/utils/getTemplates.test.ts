import {
    mockComponentTemplateFull,
    mockComponentTemplateBasic,
    mockComponentTemplateNoStyles,
    mockComponentTemplateNoTypes,
    mockIndexTemplate,
    mockStylesTemplate,
    mockTypesTemplate,
} from '../../../templates/mocks'
import getTemplates, { TransformedTemplate } from './getTemplates'

describe('getTemplates: Test that util', () => {
    it('should return correct values for default arguments', () => {
        const result = getTemplates('TestComponent', false, false)

        const expectedResult: TransformedTemplate = {
            component: mockComponentTemplateFull,
            index: mockIndexTemplate,
            styles: mockStylesTemplate,
            types: mockTypesTemplate,
        }

        expect(result).toEqual(expectedResult)
    })

    it('should return correct values when --noStyles is used', () => {
        const result = getTemplates('TestComponent', true, false)

        const expectedResult: TransformedTemplate = {
            component: mockComponentTemplateNoStyles,
            index: mockIndexTemplate,
            styles: mockStylesTemplate,
            types: mockTypesTemplate,
        }

        expect(result).toEqual(expectedResult)
    })

    it('should return correct values when --noTypes is used', () => {
        const result = getTemplates('TestComponent', false, true)

        const expectedResult: TransformedTemplate = {
            component: mockComponentTemplateNoTypes,
            index: mockIndexTemplate,
            styles: mockStylesTemplate,
            types: mockTypesTemplate,
        }

        expect(result).toEqual(expectedResult)
    })

    it('should return correct values when --noTypes and --noStyles are used', () => {
        const result = getTemplates('TestComponent', true, true)

        const expectedResult: TransformedTemplate = {
            component: mockComponentTemplateBasic,
            index: mockIndexTemplate,
            styles: mockStylesTemplate,
            types: mockTypesTemplate,
        }

        expect(result).toEqual(expectedResult)
    })
})
