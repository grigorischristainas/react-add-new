export default `import React from 'react'
WITH_TYPES_ADD_IMPORT

const CONTEXT_NAME = React.createContext<CONTEXT_TYPE | null>(null)

const PROVIDER_NAME = ({children}: CONTEXT_PROPS): JSX.Element => {

    const contextValue = React.useMemo(() => ({}), [])

    return <CONTEXT_NAME.Provider value={contextValue}>{children}</CONTEXT_NAME.Provider>
}

export const useCONTEXT_NAME = (): CONTEXT_TYPE => {
    const context = React.useContext(CONTEXT_NAME)

    if (context === null) {
        throw new Error('CONTEXT_NAME: You are using useCONTEXT_NAME outside of PROVIDER_NAME')
    }

    return context
}

export default PROVIDER_NAME
`
