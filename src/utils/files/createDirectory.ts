import * as fs from 'fs'

export const createDirectory = (folderPath: string) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(folderPath, { recursive: true }, (err) =>
            err ? reject(err) : resolve('success')
        )
    })
}

export default createDirectory
