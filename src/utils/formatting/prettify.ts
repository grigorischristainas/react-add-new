import prettier from 'prettier'
import { defaultConfig } from './constants'

const prettify = async (text: string, folderPath: string) => {
    const configFile = await prettier.resolveConfig(folderPath)

    const config = configFile || defaultConfig

    const configWithParser = config?.parser
        ? config
        : { ...config, parser: 'babel-ts' }

    return prettier.format(text, configWithParser)
}

export default prettify
