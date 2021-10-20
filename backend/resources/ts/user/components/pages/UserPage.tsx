import { Box } from '@material-ui/core'
import React from 'react'
import UserContent from '../../containers/organisms/UserContents'
import UserProfile from '../../containers/organisms/UserProfile'

type Props = {
    userName: string
}

const OtherUserPage: React.FC<Props> = ({ userName }) => {
    return (
        <Box>
            <UserProfile userName={userName} />
            <UserContent />
        </Box>
    )
}
export default OtherUserPage
