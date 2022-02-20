import { Button, Card, CardActions, Typography, useTheme } from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { AxiosError } from 'axios'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PlaceCardAction from '../../containers/molecules/PlaceCardAction'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'

type Props = {
    place: Place
    error?: AxiosError<any> | null
}

const PlaceCard: React.FC<Props> = ({
    place,
    error
}) => {
    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()

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
                <PlaceCardAction
                    place={place}
                />
            }

            {/* placeの詳細ページの際は非表示 */}
            {/* indexOfで前方一致 */}
            {!(location.pathname.indexOf('place') > -1) &&
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
                </CardActions>
            }
        </Card>
    )
}
export default PlaceCard
