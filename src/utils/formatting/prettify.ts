import prettier from 'prettier'

const prettify = (text: string) => {
    return prettier.format(text, {
        trailingComma: 'es5',
        tabWidth: 4,
        semi: false,
        singleQuote: true,
        parser: 'babel-ts',
    })
}

export default prettify
