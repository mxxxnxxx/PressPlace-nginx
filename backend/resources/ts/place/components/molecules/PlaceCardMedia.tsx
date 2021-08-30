import { CardMedia, Typography } from "@material-ui/core"
import React from "react"
import { Place } from "../../types/Place"

type Props = {
    place: Place
}
const PlaceCardMedia: React.FC<Props> = ({ place }) => {
    return (
        <>
            {place.placeImages[0] ?
                <CardMedia
                    title="Paella dish"
                >
                    <img
                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.placeImages[0].imagePath}`}
                        style={{ height: 200 }}
                    />
                </CardMedia>
                :
                <Typography>
                    画像は投稿されていません
                </Typography>
            }
        </>
    )
}

export default PlaceCardMedia
