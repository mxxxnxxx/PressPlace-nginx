import { Box, IconButton, makeStyles } from '@material-ui/core'
import BlurOffIcon from '@material-ui/icons/BlurOff'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React, { useRef, useState } from 'react'
import Swiper, { SwiperRefNode } from "react-id-swiper"
import 'swiper/css/swiper.css'
import { Place } from '../../types/Place'
import { PlaceImage } from '../../types/PlaceImage'
type Props = {
    place: Place
}

const useStyle = makeStyles((theme) => ({
    root: {
        width: '13rem',
        margin: 'auto'
    },
    swiperMedia: {
        // 正方形のラッパー
        backgroundColor: 'white',
        width: '100%',
        height: '20rem',
        objectFit: 'contain'
    },
    swiperButton: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto'
    },
    BlurOffIcon: {
        display: 'flex',
        justifyContent: 'center',
    }
}))
const PlaceImageSwiper = React.forwardRef<HTMLDivElement, Props>(
    ({ place }, ref) => {
        const classes = useStyle()
        const swiperRef = useRef<SwiperRefNode>(null);

        const goNext = () => {
            if (swiperRef?.current?.swiper) {
                swiperRef.current.swiper.slideNext();
            }
        }

        const goPrev = () => {
            if (swiperRef?.current?.swiper) {
                swiperRef.current.swiper.slidePrev();
            }
        }

        // スワイパーの設定パラメーター
        const [params] = useState({
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: false
            },
            speed: 400,
        })
        return (
            <div ref={ref} className={classes.root}>
                {place.placeImages.length >= 1 &&

                    <Swiper
                        {...params}
                        ref={swiperRef}
                    >
                        {place.placeImages.map((placeImage: PlaceImage, index) => (
                            <div
                                key={index.toString()}
                            >
                                <img
                                    className={classes.swiperMedia}
                                    src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${placeImage.imagePath}`}
                                />
                            </div>
                        ))}
                    </Swiper>

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
                {place.placeImages.length === 0 &&
                    <Box className={classes.BlurOffIcon}>
                        <BlurOffIcon />
                    </Box>
                }
            </div>
        )
    }
)
export default PlaceImageSwiper
