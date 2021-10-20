import React, { useRef } from 'react'
import { SwiperRefNode } from 'react-id-swiper'
import ShowPlaceModal from '../../components/organisms/ShowPlaceModal'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const EnhancedShowPlaceModal = React.forwardRef<HTMLDivElement, Props>(
    ({ place }, ref) => {

        const swiperRef = useRef<SwiperRefNode>(null);

        const goNext = () => {
            if (swiperRef?.current?.swiper) {
                swiperRef.current.swiper.slideNext();
            }
        };

        const goPrev = () => {
            if (swiperRef?.current?.swiper) {
                swiperRef.current.swiper.slidePrev();
            }
        };
        return (
            <ShowPlaceModal
                place={place}
                swiperRef={swiperRef}
                goNext={goNext}
                goPrev={goPrev}
                forwardRef={ref}
            />
        )
    }
)
export default EnhancedShowPlaceModal
