const depthLimitParser = (value: string) => {
    if (value) {
        return Number(value)
    }

    return value
}

export default depthLimitParser
