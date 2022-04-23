import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import EnhancedNewPlaceForm from '../../containers/organisms/NewPlaceForm'
import Sphere from '../../../../../public/background_image/sphere.png'

const useStyle = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Sphere})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    },
}))
const NewPlace: React.FC = () => {
    const classes = useStyle()
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            className={classes.root}
        >
            <EnhancedNewPlaceForm />
        </Box>
    )
}

export default NewPlace
