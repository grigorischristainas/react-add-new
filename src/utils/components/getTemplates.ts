import componentTemplate from '../../templates/componentTemplate'
import indexTemplate from '../../templates/indexTemplate'
import typesTemplate from '../../templates/typesTemplate'
import stylesTemplate from '../../templates/stylesTemplate'
import replacePlaceholders from './replacePlaceholders'

export type TransformedTemplate = {
    [k in 'component' | 'index' | 'types' | 'styles']: string
}

const getTemplates = (
    componentName: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const baseTemplates = [
        {
            name: 'component',
            template: componentTemplate,
        },
        {
            name: 'index',
            template: indexTemplate,
        },
        {
            name: 'types',
            template: typesTemplate,
        },
        {
            name: 'styles',
            template: stylesTemplate,
        },
    ]

    const transformedTemplates: TransformedTemplate = baseTemplates.reduce(
        (prev, curr) => ({
            ...prev,
            [`${curr.name}`]: replacePlaceholders(
                componentName,
                curr.template,
                noStyles,
                noTypes
            ),
        }),
        {} as TransformedTemplate
    )

    return transformedTemplates
}

export default getTemplates
