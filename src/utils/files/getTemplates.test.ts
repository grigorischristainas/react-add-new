import {
    mockComponentTemplateFull,
    mockComponentTemplateBasic,
    mockComponentTemplateNoStyles,
    mockComponentTemplateNoTypes,
    mockIndexTemplate,
    mockStylesTemplate,
    mockTypesTemplate,
} from '../../templates/mocks'
import {
    mockContextIndexTemplate,
    mockContextTemplate,
    mockContextTypesTemplate,
} from '../../templates/mocks/context'
import getTemplates, { TransformedTemplate } from './getTemplates'

describe('getTemplates: Test that util', () => {
    describe('component type', () => {
        it('should return correct values for default arguments', () => {
            const result = getTemplates(
                'TestComponent',
                'component',
                false,
                false
            )

            const expectedResult: TransformedTemplate = {
                component: mockComponentTemplateFull,
                index: mockIndexTemplate,
                styles: mockStylesTemplate,
                types: mockTypesTemplate,
            }

            expect(result).toEqual(expectedResult)
        })

        it('should return correct values when --noStyles is used', () => {
            const result = getTemplates(
                'TestComponent',
                'component',
                true,
                false
            )

            const expectedResult: TransformedTemplate = {
                component: mockComponentTemplateNoStyles,
                index: mockIndexTemplate,
                styles: mockStylesTemplate,
                types: mockTypesTemplate,
            }

            expect(result).toEqual(expectedResult)
        })

        it('should return correct values when --noTypes is used', () => {
            const result = getTemplates(
                'TestComponent',
                'component',
                false,
                true
            )

            const expectedResult: TransformedTemplate = {
                component: mockComponentTemplateNoTypes,
                index: mockIndexTemplate,
                styles: mockStylesTemplate,
                types: mockTypesTemplate,
            }

            expect(result).toEqual(expectedResult)
        })

        it('should return correct values when --noTypes and --noStyles are used', () => {
            const result = getTemplates(
                'TestComponent',
                'component',
                true,
                true
            )

            const expectedResult: TransformedTemplate = {
                component: mockComponentTemplateBasic,
                index: mockIndexTemplate,
                styles: mockStylesTemplate,
                types: mockTypesTemplate,
            }

            expect(result).toEqual(expectedResult)
        })
    })

    describe('context type', () => {
        it('should return correct values for default arguments', () => {
            const result = getTemplates('MySuperContext', 'context')

            const expectedResult: Omit<TransformedTemplate, 'styles'> = {
                component: mockContextTemplate,
                index: mockContextIndexTemplate,
                types: mockContextTypesTemplate,
            }

            expect(result).toEqual(expectedResult)
        })
    })
})
