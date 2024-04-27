import { ElementType } from '../../lib/types'
import getFileNames, { FileNames } from './getFileNames'

const replacePlaceholders = (
    componentName: string,
    template: string,
    type: ElementType,
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

    const content =
        type === 'component'
            ? template
                  .replace(/COMPONENT_NAME/g, componentName)
                  .replace(
                      /WITH_STYLES_ADD_IMPORT\n?/g,
                      noStyles
                          ? ''
                          : `import { StyledRootContainer } from './${fileNamesWithoutExtensions.styles}'\n`
                  )
                  .replace(
                      /COMPONENT_ELEMENT/g,
                      noStyles ? 'div' : 'StyledRootContainer'
                  )
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
            : template
                  .replace(/CONTEXT_NAME/g, componentName)
                  .replace(/PROVIDER_NAME/g, `${componentName}Provider`)
                  .replace(
                      /WITH_TYPES_ADD_IMPORT\n?/g,
                      `import { ${componentName}Props, ${componentName}Type } from './${fileNamesWithoutExtensions.types}'\n`
                  )
                  .replace(/CONTEXT_TYPE/g, `${componentName}Type`)
                  .replace(/CONTEXT_PROPS/g, `${componentName}Props`)

    return content
}

export default replacePlaceholders
