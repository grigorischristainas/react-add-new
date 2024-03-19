const formatContent = (
    componentName: string,
    template: string,
    withStyles: boolean,
    withTypes: boolean
) => {
    const content = template
        .replace(/COMPONENT_NAME/g, componentName)
        .replace(
            /WITH_STYLES_ADD_IMPORT/g,
            withStyles
                ? `import { StyledRootContainer } from './${componentName}Styles'`
                : ''
        )
        .replace(
            /COMPONENT_ELEMENT/g,
            withStyles ? 'StyledRootContainer' : 'div'
        )
        .replace(
            /WITH_TYPES_ADD_IMPORT/g,
            withTypes ? `import { ${componentName}Props } from './types'` : ''
        )
        .replace(
            /WITH_TYPES_ADD_DEFINITION/g,
            withTypes ? `{}:  ${componentName}Props` : ''
        )

    return content
}

export default formatContent
