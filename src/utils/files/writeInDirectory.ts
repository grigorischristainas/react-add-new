import * as fs from 'fs'
import * as path from 'path'
import prettify from '../formatting/prettify'

export const writeInDirectory = (
    folderPath: string,
    fileName: string,
    componentName: string,
    extension: string,
    template: string
) => {
    return new Promise(async (resolve, reject) => {
        const content = template.replace(/COMPONENT_NAME/g, componentName)

        const prettifiedContent = await prettify(content)

        const filePath = path.join(folderPath, `${fileName}.${extension}`)

        fs.writeFile(filePath, prettifiedContent, 'utf-8', (err) => {
            err ? reject(err) : resolve('success')
        })
    })
}

export default writeInDirectory
