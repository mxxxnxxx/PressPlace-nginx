import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import PlaceFavoriteUsers from '../../../user/containers/organisms/PlaceFavoriteUsers'
import PlaceCard from '../../containers/organisms/PlaceCard'
import { Place } from '../../types/Place'
import Map from '../../../../../public/background_image/map.png'
import MyPageButton from '../atoms/MyPageButton'


const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    placeCard: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '80%',
        margin: 'auto',
    },
    placeFavoriteUsers: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '80%',
        margin: 'auto',
    },
}))
const Place: React.FC = () => {
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <div className={classes.placeCard}>
                <PlaceCard />
            </div>
            <div className={classes.placeFavoriteUsers}>
                <PlaceFavoriteUsers />
            </div>
            <MyPageButton />
        </Box>
    )
}
export default Place
