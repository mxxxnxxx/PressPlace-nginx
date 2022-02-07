import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import UserContent from '../../containers/organisms/UserContents'
import UserProfile from '../../containers/organisms/UserProfile'
import Vortex from '/work/backend/public/background_image/vortex.png'

type Props = {
    userName: string
}
const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${Vortex})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }
}))
const UserPage: React.FC<Props> = ({ userName }) => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <UserProfile userName={userName} />
            <UserContent />
        </Box>
    )
}
export default UserPage
