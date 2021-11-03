import { Box, Button, CardContent, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import { typography } from '@material-ui/system'
import React, { useState } from "react"
import 'swiper/css/swiper.css'
import PlaceGoogleMap from '../../containers/molecules/PlaceGoogleMap'
import ShowPlaceModal from '../../containers/organisms/ShowPlaceModal'
import { Place } from '../../types/Place'
import OverlapImage from '/work/backend/public/images/overlapImage.png'

type Props = {
    place: Place
}
const useStyle = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: '0px',
    },

    item1: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2 2 30%',
        justifyContent: 'center',
        margin: theme.spacing(1)
    },
    placeImageButton: {
        "& img": {
            maxWidth: '100%'
        },
    },
    overlapImage: {


    },

    item2: {
        flex: '5 5 50%',
        borderRight: 'dashed thin',
    },
    'placeNameContainer': {
        borderBottom: 'solid thin',
        margin: '20px'
    },
    placeNameLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '12px',
        marginBottom: theme.spacing(1)
    },
    placeName: {
        marginRight: theme.spacing(2),
    },
    placeCommentContainer: {
        margin: '20px',
    },
    placeCommentLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '12px',
        marginBottom: theme.spacing(1)
    },
    placeComment: {
        overflow: 'hidden',
        whiteSpace: 'pre-line',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
    },


    item3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: '2 2 20%',
    },
    placeAddressContainer: {
        margin: theme.spacing(1),
    },
    placeAddressLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '12px',
        marginBottom: theme.spacing(1)
    },
    placeAddress: {
        textDecoration: 'underline',
        fontSize: '12px'
    },
    placeGoogleMap: {
        alignSelf: 'center'
    },
    myPlaceButton: {
        textTransform: 'none',
    }
}))
const PlaceCardContent: React.FC<Props> = ({ place }) => {
    // ui部分なのでここに記述

    const classes = useStyle()
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')
    const handleOpen = (scrollType: DialogProps['scroll']) => {
        setOpen(true)
        setScroll(scrollType)
    }

    const handleClose = () => {
        setOpen(false)
    }



    return (
        <CardContent className={classes.container}>
            <Box
                className={classes.item1}
            >
                <IconButton
                    className={classes.placeImageButton}
                    aria-label=""
                    onClick={() => handleOpen('paper')}
                >
                    {place.placeImages.length > 0 &&
                        <img
                            src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.placeImages[0]?.imagePath}`}
                            alt="placeImage"
                        />
                    }
                    {place.placeImages.length === 0 &&
                        <ClearAllIcon />
                    }
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}

                >
                    <DialogTitle id="scroll-dialog-title">{place.name}</DialogTitle>

                    <DialogContent dividers={scroll === 'paper'}>
                        <ShowPlaceModal
                            place={place}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box className={classes.item2}>
                <Box className={classes.placeNameContainer}>
                    <Typography
                        align='left'
                        variant='subtitle2'
                        className={classes.placeNameLabel}
                    >
                        -場所の名前-
                    </Typography>
                    <Typography
                        align='left'
                        className={classes.placeName}
                    >
                        {place.name}
                    </Typography>
                </Box>
                <Box className={classes.placeCommentContainer}>
                    <Typography
                        className={classes.placeCommentLabel}
                    >
                        -コメント-
                    </Typography>
                    <p className={classes.placeComment}>
                        {place.comment}
                    </p>
                </Box>
            </Box>
            <Box className={classes.item3}>
                <Box className={classes.placeAddressContainer}>
                    <Typography
                        className={classes.placeAddressLabel}
                    >
                        -場所-
                    </Typography>
                    <Typography className={classes.placeAddress}>
                        {place.address}
                    </Typography>
                </Box>
                <Box className={classes.placeGoogleMap}>
                    <PlaceGoogleMap
                        place={place}
                    />
                </Box>
            </Box>
        </CardContent >
    )
}
export default PlaceCardContent
