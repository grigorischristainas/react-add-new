import { ElementType } from '../../lib/types'
import { baseComponentTemplates, baseContextTemplates } from './consts'
import replacePlaceholders from './replacePlaceholders'

export type TransformedTemplate = {
    [k in 'component' | 'index' | 'types' | 'styles']: string
}

const getTemplates = (
    componentName: string,
    type: ElementType,
    noStyles: boolean = false,
    noTypes: boolean = false
) => {
    const baseTemplates =
        type === 'component' ? baseComponentTemplates : baseContextTemplates

    const transformedTemplates: TransformedTemplate = baseTemplates.reduce(
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
        {} as TransformedTemplate
    )

    return transformedTemplates
}

export default getTemplates
