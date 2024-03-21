const replacePlaceholders = (
    componentName: string,
    template: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const content = template
        .replace(/COMPONENT_NAME/g, componentName)
        .replace(
            /WITH_STYLES_ADD_IMPORT\n?/g,
            noStyles
                ? ''
                : `import { StyledRootContainer } from './${componentName}Styles'\n`
        )
        .replace(/COMPONENT_ELEMENT/g, noStyles ? 'div' : 'StyledRootContainer')
        .replace(
            /WITH_TYPES_ADD_IMPORT\n?/g,
            noTypes ? '' : `import { ${componentName}Props } from './types'\n`
        )
        .replace(
            /WITH_TYPES_ADD_DEFINITION/g,
            noTypes ? '' : `{}: ${componentName}Props`
        )

    return content
}

export default replacePlaceholders
