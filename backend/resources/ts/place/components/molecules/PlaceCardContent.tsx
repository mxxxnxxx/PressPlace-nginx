import { CardContent, Typography } from '@material-ui/core'
import React from "react"
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const PlaceCardContent: React.FC<Props> = ({ place }) => {
    return (
        <CardContent>
            <Typography variant="subtitle1" color="initial">
                場所の名前
            </Typography>

            <Typography paragraph>
                {place.name}
            </Typography>

            <Typography variant="subtitle1" color="initial">
                住所
            </Typography>

            <Typography paragraph>
                {place.address}
            </Typography>

            <Typography variant="subtitle1" color="initial">
                コメント
            </Typography>

            <Typography>
                {place.comment}
            </Typography>

            <Typography>
                {place.createdAt}
            </Typography>
        </CardContent>
    )
}
export default PlaceCardContent
