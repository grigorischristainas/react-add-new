import prettier from 'prettier'

export const defaultConfig: prettier.Options = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    parser: 'babel-ts',
}
