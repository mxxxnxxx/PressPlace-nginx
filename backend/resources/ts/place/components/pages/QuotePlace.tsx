import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import Quote from '../../../../../public/background_image/quote.jpg'
import QuotePlaceForm from '../../containers/organisms/QuotePlaceForm'

const useStyle = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Quote})`,
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
            <QuotePlaceForm />
        </Box>
    )
}

export default NewPlace
