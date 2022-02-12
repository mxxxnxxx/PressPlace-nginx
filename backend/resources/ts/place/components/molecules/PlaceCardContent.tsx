import { Box, Button, CardContent, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import { typography } from '@material-ui/system'
import React, { useState } from "react"
import 'swiper/css/swiper.css'
import PlaceGoogleMap from '../../containers/molecules/PlaceGoogleMap'
import ShowPlaceModal from '../../containers/organisms/ShowPlaceModal'
import { Place } from '../../types/Place'
import BlurOffIcon from '@material-ui/icons/BlurOff'

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
    },
    placeInfoContainer: {
        borderBottom: 'solid thin',
        marginBottom: theme.spacing(2),
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
        marginLeft: theme.spacing(1),
        whiteSpace: 'pre-wrap',
        display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': '5',
        '-webkit-box-orient': 'vertical',
    },
    placeImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    placeImageButton: {
        padding: '0px',
        "& img": {
            maxWidth: '100%'
        },
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
                <Typography
                    align='left'
                    className={classes.placeInfo}
                >
                    {place.comment}
                </Typography>
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
            <Box className={classes.placeImageContainer}>
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
                        <BlurOffIcon />
                    }
                </IconButton>
            </Box>
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
