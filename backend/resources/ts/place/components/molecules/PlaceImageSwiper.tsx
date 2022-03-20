import { Box, makeStyles } from '@material-ui/core'
import BlurOffIcon from '@material-ui/icons/BlurOff'
import React from 'react'
import { EffectCube, Pagination } from 'swiper'
import 'swiper/css'
import "swiper/css/effect-cube"
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
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
const PlaceImageSwiper: React.FC<Props> = ({ place }) => {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            {place.placeImages.length >= 1 &&

                <Swiper
                    effect={"cube"}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: false,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper"
                >
                    {place.placeImages.map((placeImage: PlaceImage, index) => (
                        <SwiperSlide
                            key={index.toString()}
                        >
                            <img
                                className={classes.swiperMedia}
                                src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${placeImage.imagePath}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
            {
                place.placeImages.length === 0 &&
                <Box className={classes.BlurOffIcon}>
                    <BlurOffIcon />
                </Box>
            }
        </div >
    )
}

export default PlaceImageSwiper
