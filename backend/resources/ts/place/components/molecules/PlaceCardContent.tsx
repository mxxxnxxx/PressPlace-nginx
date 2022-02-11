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
        padding: theme.spacing(2),
    },
    placeImageButton: {
        "& img": {
            maxWidth: '100%'
        },
    },
    'placeNameContainer': {
        borderBottom: 'solid thin',
    },
    placeNameLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '0.8rem',
    },
    placeName: {
        marginLeft: '12px'
    },
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
        </CardContent >
    )
}
export default PlaceCardContent
