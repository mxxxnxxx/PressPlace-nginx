import { Box } from '@material-ui/core'
import React from 'react'
import UserPlaces from '../../containers/organisms/UserPlaces'
import UserProfile from '../../containers/organisms/UserProfile'

type Props = {
    userId?: number
}

const OtherUserPage: React.FC<Props> = ({ userId }) => {
    return (
        <Box>
            <UserProfile userId={userId} />
            <UserPlaces userId={userId} />
        </Box>
    )
}
export default OtherUserPage
