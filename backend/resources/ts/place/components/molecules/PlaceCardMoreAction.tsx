import { Box, Button, CardActions, useTheme } from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import React from 'react'
import { useHistory } from 'react-router-dom'
import PlaceFavoriteUserGP from '../../../user/components/molecules/PlaceFavoriteUserGP'
import useGetCurrentUser from '../../../user/hooks/useGetCurrentUser'
import { Place } from '../../types/Place'
import PlaceQuoteButton from '../atoms/PlaceQuoteButton'
type Props = {
    place: Place
}
const PlaceCardMoreAction: React.FC<Props> = ({ place }) => {
    const currentUser = useGetCurrentUser()
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

            {/* 引用ボタン */}
            {!(currentUser?.id === place.userId) && currentUser &&
                <Box style={{
                    marginRight: 'auto'
                }}>
                    <PlaceQuoteButton place={place} />
                </Box>
            }


        </CardActions>
    )
}
export default PlaceCardMoreAction
