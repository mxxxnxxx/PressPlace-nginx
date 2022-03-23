import { Card, Typography } from '@material-ui/core'
import { AxiosError } from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import PlaceCardTagAction from '../../containers/molecules/PlaceCardTagAction'
import { Place } from '../../types/Place'
import PlaceCardMoreAction from '../molecules/PlaceCardMoreAction'

type Props = {
    place: Place
    error?: AxiosError<any> | null
}

const PlaceCard: React.FC<Props> = ({
    place,
    error
}) => {
    const location = useLocation()

    if (error) {
        return (
            <Typography variant="h5" color="secondary" align='center'>
                うまく表示ができませんでした
            </Typography>
        )
    }
    return (
        <Card>
            <PlaceCardHeader place={place} />
            <PlaceCardContent place={place} />
            {place.tags.length > 0 &&
                <PlaceCardTagAction
                    place={place}
                />
            }

            {/* placeの詳細ページの際は非表示 */}
            {/* indexOfで前方一致 */}
            {location.pathname.indexOf('place/') === -1 &&
                <PlaceCardMoreAction place={place} />
            }
        </Card>
    )
}
export default PlaceCard
