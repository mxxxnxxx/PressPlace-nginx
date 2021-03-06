import { Box, Button, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from "react"
import { useLocation } from 'react-router-dom'
import PlaceGoogleMap from '../../containers/molecules/PlaceGoogleMap'
import { Place } from '../../types/Place'
import PlaceImageSwiper from './PlaceImageSwiper'


type Props = {
    place: Place
}
const useStyle = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    placeData: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(2)
    },
    placeInfoContainer: {
        borderBottom: 'solid thin',
        marginBottom: theme.spacing(4),
    },
    placeInfoLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '0.8rem',

    },
    placeGoogleMap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(3)
    },
    placeInfo: {
        lineHeight: '2em',
        marginLeft: theme.spacing(1),
        whiteSpace: 'pre-wrap',
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': '5',
        '-webkit-box-orient': 'vertical',
    },
    placeCommentFull: {
        lineHeight: '2em',
        marginLeft: theme.spacing(1),
        whiteSpace: 'pre-wrap',
    }
}))
const PlaceCardContent: React.FC<Props> = ({ place }) => {
    // ui部分なのでここに記述
    const classes = useStyle()
    const location = useLocation()
    return (
        <CardContent className={classes.container}>
            <Box className={classes.placeData}>
                <Typography variant='subtitle2'>
                    更新日時:{place.updatedAt}
                </Typography>
            </Box>
            <Box className={classes.placeInfoContainer}>
                <Typography
                    align='left'
                    variant='subtitle2'
                    className={classes.placeInfoLabel}
                >
                    -場所の名前-
                </Typography>
                <Typography
                    align='left'
                    variant='h4'
                    className={classes.placeInfo}
                >
                    {place.name}
                </Typography>
            </Box>
            <Box className={classes.placeInfoContainer}>
                <Typography
                    align='left'
                    variant='subtitle2'
                    className={classes.placeInfoLabel}
                >
                    -コメント-
                </Typography>

                {/* 詳細ページのみコメントを省略しない */}
                {/* pathnameで判断 */}
                {location.pathname.indexOf('/place') === 0 ?
                    <Typography
                        align='left'
                        className={classes.placeCommentFull}
                    >
                        {place.comment}
                    </Typography>
                    :
                    <Typography
                        align='left'
                        className={classes.placeInfo}
                    >
                        {place.comment}
                    </Typography>
                }

            </Box>
            <Box className={classes.placeInfoContainer}>
                <Typography
                    align='left'
                    variant='subtitle2'
                    className={classes.placeInfoLabel}
                >
                    -場所-
                </Typography>
                <Typography
                    align='left'
                    className={classes.placeInfo}
                >
                    {place.address}
                </Typography>
            </Box>
            <Box className={classes.placeGoogleMap}>
                <PlaceGoogleMap place={place} />
            </Box>
            <PlaceImageSwiper place={place} />
        </CardContent >
    )
}


export default PlaceCardContent
