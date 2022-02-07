import React from 'react'
import PlaceGoogleMap from '../../components/molecules/PlaceGoogleMap'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const EnhancedPlaceGoogleMap: React.FC<Props> = ({
    place
}) => {

    const goMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${place.address}`, '_blank')
    }
    return (
        <PlaceGoogleMap
            place={place}
            goMap={goMap}
        />
    )
}
export default EnhancedPlaceGoogleMap
