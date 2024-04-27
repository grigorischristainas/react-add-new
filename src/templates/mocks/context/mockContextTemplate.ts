export default `import React from 'react'
import { MySuperContextProps, MySuperContextType } from './types'

const MySuperContext = React.createContext<MySuperContextType | null>(null)

const MySuperContextProvider = ({children}: MySuperContextProps): JSX.Element => {

    const contextValue = React.useMemo(() => ({}), [])

    return <MySuperContext.Provider value={contextValue}>{children}</MySuperContext.Provider>
}

export const useMySuperContext = (): MySuperContextType => {
    const context = React.useContext(MySuperContext)

    if (context === null) {
        throw new Error('MySuperContext: You are using useMySuperContext outside of MySuperContextProvider')
    }

    return context
}

export default MySuperContextProvider
`
