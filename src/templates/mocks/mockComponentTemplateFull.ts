export default `import React from 'react'
import { StyledRootContainer } from './TestComponentStyles'
import { TestComponentProps } from './types'

const TestComponent = ({}: TestComponentProps): JSX.Element => {
    return <StyledRootContainer>TestComponent says hi!</StyledRootContainer>
}

export default TestComponent
`
