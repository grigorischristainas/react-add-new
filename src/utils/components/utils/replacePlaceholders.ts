import getFileNames, { FileNames } from './getFileNames'

const replacePlaceholders = (
    componentName: string,
    template: string,
    noStyles: boolean,
    noTypes: boolean
) => {
    const fileNames = getFileNames(componentName)

    const fileNamesWithoutExtensions = Object.fromEntries(
        Object.entries(fileNames).map(([key, value]) => [
            key,
            value.slice(0, value.lastIndexOf('.')),
        ])
    ) as FileNames

    const content = template
        .replace(/COMPONENT_NAME/g, componentName)
        .replace(
            /WITH_STYLES_ADD_IMPORT\n?/g,
            noStyles
                ? ''
                : `import { StyledRootContainer } from './${fileNamesWithoutExtensions.styles}'\n`
        )
        .replace(/COMPONENT_ELEMENT/g, noStyles ? 'div' : 'StyledRootContainer')
        .replace(
            /WITH_TYPES_ADD_IMPORT\n?/g,
            noTypes
                ? ''
                : `import { ${componentName}Props } from './${fileNamesWithoutExtensions.types}'\n`
        )
        .replace(
            /WITH_TYPES_ADD_DEFINITION/g,
            noTypes ? '' : `{}: ${componentName}Props`
        )

    return content
}

export default replacePlaceholders
