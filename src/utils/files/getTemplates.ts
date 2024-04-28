import { ElementType } from '../../lib/types'
import { baseComponentTemplates, baseContextTemplates } from './consts'
import replacePlaceholders from './replacePlaceholders'

export type TransformedTemplateComponent = {
    [k in 'component' | 'index' | 'types' | 'styles']: string
}

export type TransformedTemplateContext = {
    [k in 'component' | 'index' | 'types']: string
}

export type TransformedTemplate =
    | TransformedTemplateComponent
    | TransformedTemplateContext

function getTemplates(
    componentName: string,
    type: 'component',
    noStyles: boolean,
    noTypes: boolean
): TransformedTemplateComponent

function getTemplates(
    componentName: string,
    type: 'context'
): TransformedTemplateContext

function getTemplates(
    componentName: string,
    type: ElementType,
    noStyles: boolean = false,
    noTypes: boolean = false
) {
    const baseTemplates =
        type === 'component' ? baseComponentTemplates : baseContextTemplates

    const transformedTemplates = baseTemplates.reduce(
        (prev, curr) => ({
            ...prev,
            [`${curr.name}`]: replacePlaceholders(
                componentName,
                curr.template,
                type,
                noStyles,
                noTypes
            ),
        }),
        {}
    )

    return transformedTemplates
}

export default getTemplates
