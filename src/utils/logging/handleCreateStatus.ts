import { CreateStatus } from '../../lib/types'
import { logError, logNewComponentSuccess } from './logger'

const handleCreateStatus = (createStatus: CreateStatus) => {
    if (createStatus.status === 'OK') {
        logNewComponentSuccess(createStatus.msg)
    } else {
        logError(createStatus.msg)
    }
}

export default handleCreateStatus
