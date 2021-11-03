import React from 'react'
import PlaceCardContent from '../../components/molecules/PlaceCardContent'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}

const EnhancedPlaceCardContent: React.FC<Props> = ({ place }) => {
    return (
        <PlaceCardContent
            place={place}
        />
    )
}
export default EnhancedPlaceCardContent
