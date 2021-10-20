import React from 'react'
import PlaceCardContent from '../../components/molecules/PlaceCardContent'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}

const EnhancedPlaceCardContent: React.FC<Props> = ({ place }) => {
    const goMap = () => {
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${place.address}`
    }
    return (
        <PlaceCardContent
            place={place}
        />
    )
}
export default EnhancedPlaceCardContent
