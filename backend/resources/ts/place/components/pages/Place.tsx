import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import React, { FC } from 'react'
import PlaceCard from '../../containers/organisms/PlaceCard'
import Map from '/work/backend/public/background_image/map.png'

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',

    }
}))
const Place: FC = () => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <main>
                <Container>
                    <PlaceCard />
                </Container>
            </main>
        </Box>
    )
}
export default Place
