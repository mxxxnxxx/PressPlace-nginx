import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import AuthUserContent from '../../containers/organisms/AuthUserContent'
import AuthUserProfile from '../../containers/organisms/AuthUserProfile'
import Vortex from '../../../../../public/background_image/vortex.png'

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
const AuthUserPage: React.FC = () => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <AuthUserProfile />
            <AuthUserContent />
        </Box>
    )
}
export default AuthUserPage
