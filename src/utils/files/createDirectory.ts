import * as fs from 'fs'

export const createDirectory = (folderPath: string) => {
    return new Promise<string>((resolve, reject) => {
        fs.mkdir(folderPath, { recursive: true }, (err) =>
            err ? reject(err.message) : resolve('success')
        )
    })
}

export default createDirectory
