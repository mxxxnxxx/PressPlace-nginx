import { makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import React, { FC } from 'react'
import PlaceCards from '../../containers/organisms/PlaceCards'
import Map from '/work/backend/public/background_image/map.png'
import Heading from '/work/backend/public/background_image/Heading.jpg'

const useStyle = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    heading: {
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: `url(${Heading})`,

    },

    textBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-moz-transform': ' translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        'z-index': 100
    }

}))
const Places: FC = () => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <div className={classes.heading}>
                <div className={classes.textBox}>
                    <Typography align='center' variant="h2" color="initial">
                        PressPlace
                    </Typography>
                    <Typography align='center' variant="h6" color="initial">
                        場所でつながるSNS
                    </Typography>
                </div>
            </div>
            <PlaceCards />

        </Box >
    )
}
export default Places
