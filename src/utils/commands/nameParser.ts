import { InvalidOptionArgumentError } from 'commander'
import validateName from '../validators/validateName'

const nameParser = (value: string) => {
    const result = validateName(value)
    if (result === true) {
        return value
    }

    throw new InvalidOptionArgumentError(result)
}

export default nameParser
