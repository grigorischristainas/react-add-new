import {
    componentTemplate,
    indexTemplate,
    stylesTemplate,
    typesTemplate,
} from '../../templates'
import {
    contextTemplate,
    indexTemplate as contextIndexTemplate,
    typesTemplate as contextTypesTemplate,
} from '../../templates/context'

export const baseContextTemplates = [
    {
        name: 'component',
        template: contextTemplate,
    },
    {
        name: 'index',
        template: contextIndexTemplate,
    },
    {
        name: 'types',
        template: contextTypesTemplate,
    },
]

export const baseComponentTemplates = [
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
