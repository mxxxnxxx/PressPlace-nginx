import { Button } from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map'
import React from 'react'
import { Place } from '../../types/Place'

type Props = {
    place: Place
    goMap: () => void
}
const PlaceGoogleMap: React.FC<Props> = ({
    place,
    goMap

}) => {
    return (
        <Button
            onClick={() => goMap()}
            startIcon={<MapIcon />}
        >map</Button>
    )
}
export default PlaceGoogleMap
