import * as fs from 'fs'
import * as path from 'path'
import prettify from '../formatting/prettify'

export const writeInDirectory = (
    folderPath: string,
    fileName: string,
    extension: string,
    content: string
) => {
    return new Promise<string>(async (resolve, reject) => {
        const prettifiedContent = await prettify(content, folderPath)

        const filePath = path.join(folderPath, `${fileName}.${extension}`)

        fs.writeFile(filePath, prettifiedContent, 'utf-8', (err) => {
            err ? reject(err.message) : resolve('success')
        })
    })
}

export default writeInDirectory
