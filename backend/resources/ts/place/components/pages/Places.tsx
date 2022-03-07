import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import React, { FC } from 'react'
import AppImageCover from '../../../layout/components/organisms/AppImageCover'
import PlaceCards from '../../containers/organisms/PlaceCards'
import Map from '/work/backend/public/background_image/map.png'


const useStyle = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }

}))
const Places: FC = () => {
    const classes = useStyle()


    return (
        <Box className={classes.root}>
            <AppImageCover />
            <section id='place-cards'>
                <PlaceCards />
            </section>
        </Box>
    )
}
export default Places
