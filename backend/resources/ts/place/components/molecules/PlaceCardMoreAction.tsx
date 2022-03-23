import { Button, CardActions, useTheme } from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import React from 'react'
import { useHistory } from 'react-router-dom'
import PlaceFavoriteUserGP from '../../../user/components/molecules/PlaceFavoriteUserGP'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const PlaceCardMoreAction: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const theme = useTheme()
    return (
        <CardActions style={{
            flexDirection: 'row-reverse',
        }}>
            <Button
                onClick={() => { history.push(`/place/${place.id}`) }}
                startIcon={<MenuBookIcon />}
                style={{
                    marginRight: theme.spacing(1)
                }}
            >
                more...
            </Button>
            <PlaceFavoriteUserGP place={place} />
        </CardActions>
    )
}
export default PlaceCardMoreAction
