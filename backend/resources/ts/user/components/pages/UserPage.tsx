import { Box } from '@material-ui/core'
import React from 'react'
import UserPlaces from '../../containers/organisms/UserPlaces'
import UserProfile from '../../containers/organisms/UserProfile'

type Props = {
    userName: string
}

const OtherUserPage: React.FC<Props> = ({ userName }) => {
    return (
        <Box>
            <UserProfile userName={userName} />
            <UserPlaces userName={userName} />
        </Box>
    )
}
export default OtherUserPage
