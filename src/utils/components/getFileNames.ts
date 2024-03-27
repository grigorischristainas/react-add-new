export type FileNames = {
    [k in 'component' | 'index' | 'types' | 'styles']: string
}

const getFileNames = (componentName: string): FileNames => {
    return {
        component: `${componentName}.tsx`,
        index: 'index.ts',
        styles: `${componentName}Styles.ts`,
        types: 'types.ts',
    }
}

export default getFileNames
