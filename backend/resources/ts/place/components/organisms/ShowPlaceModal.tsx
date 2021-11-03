import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React, { useState } from 'react'
import Swiper, { SwiperRefNode } from "react-id-swiper"
import 'swiper/css/swiper.css'
import PlaceGoogleMap from '../../containers/molecules/PlaceGoogleMap'
import { Place } from '../../types/Place'
import { PlaceImage } from '../../types/PlaceImage'




type Props = {
    place: Place
    swiperRef: React.RefObject<SwiperRefNode>
    goNext: () => void
    goPrev: () => void
    forwardRef?: React.Ref<HTMLDivElement>
}
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(5),
        width: theme.spacing(70),
        minWidth: theme.spacing(50)
    },
    "swiper-container": {
        position: 'relative',
        overflow: 'hidden',
        height: '40vw',
        padding: '20px 0',
        maxHeight: '600px',
        minHeight: '400px',
    },
    "swiper-slide": {
        flexShrink: 0,
        textAlign: 'center',
        lineHeight: '1',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        transitionProperty: 'transform',
    },
    placeImg: {
        display: 'inline',
        maxWidth: '100%',
        maxHeight: '100%',
        alignSelf: 'center',
    },
    swiperButton: {
        alignSelf: 'center'
    },
    placeContentLabel: {
        color: 'Silver',
        fontStyle: 'italic',
        marginBottom: theme.spacing(1)

    },
    placeContent: {
        marginBottom: theme.spacing(3)
    },
    placeComment: {
        whiteSpace: 'pre-line',
        marginBottom: theme.spacing(3)
    },
    placeGoogleMap: {
        alignSelf: 'center'
    }
}))



const ShowPlaceModal: React.FC<Props> = ({
    place,
    swiperRef,
    goNext,
    goPrev,
    forwardRef
}) => {
    // スワイパーの設定パラメーター
    const [params] = useState({
        pagination: {
        },
        speed: 400,
        loopAdditionalSlides: 5,
        allowTouchMove: false,
        containerClass: "swiper-container",
        slideClass: "swiper-slide"
    })
    const classes = useStyle()
    return (
        <div ref={forwardRef} className={classes.root}>

            {place.placeImages.length >= 1 &&
                <Box>
                    <Swiper
                        {...params}
                        ref={swiperRef}
                        containerClass={classes["swiper-container"]}
                        slideClass={classes["swiper-slide"]}
                    >
                        {place.placeImages.map((placeImage: PlaceImage, index) => (
                            <div className='p-media__thumb' key={index.toString()} >
                                <img
                                    src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${placeImage.imagePath}`}
                                    className={classes.placeImg}
                                />
                            </div>
                        ))}
                    </Swiper>
                </Box>
            }
            {place.placeImages.length > 1 &&
                <Box className={classes.swiperButton}>
                    <IconButton onClick={goPrev} >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton onClick={goNext} >
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            }
            <Box>
                <Box>
                    <Typography className={classes.placeContentLabel}>
                        -場所の名前-
                    </Typography>
                </Box>
                <Box>
                    <Typography className={classes.placeContent}>
                        {place.name}
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Box>
                    <Typography className={classes.placeContentLabel}>-コメント-</Typography>
                </Box>
                <Box>
                    <Typography className={classes.placeComment}>
                        {place.comment}
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Typography className={classes.placeContentLabel}>
                        -場所-
                    </Typography>
                </Box>
                <Box>
                    <Typography className={classes.placeContent}>
                        {place.address}
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.placeGoogleMap}>
                <PlaceGoogleMap
                    place={place}
                />
            </Box>
        </div >
    )
}

export default ShowPlaceModal
