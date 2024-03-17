import * as fs from 'fs'

const componentExists = (folderPath: string) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(folderPath)) {
            reject(
                'Looks like component already exists, please try deleting its directory and try again.'
            )
        }
        resolve('success')
    })
}

export default componentExists
