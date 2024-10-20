const NAME_REGEX = /^[a-zA-Z_$][\w$]*$/

const validateName = (name: string): true | string =>
    NAME_REGEX.test(name) ||
    'Name should start with a letter, _, or $. After that, it can have letters, numbers, _, or $.'

export default validateName
