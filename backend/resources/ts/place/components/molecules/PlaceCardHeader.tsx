import { Avatar, Button, CardHeader } from "@material-ui/core"
import React from "react"
import { Place } from "../../types/Place"
import MenuButton from "./MenuButton"

type Props = {
    place: Place
    goToOtherUser: (userId: number) => void
}

const PlaceCardHeader: React.FC<Props> = ({
    place,
    goToOtherUser,
}) => {
    return (
        <CardHeader
            avatar={
                <Button
                    onClick={() => goToOtherUser(place.user.id)}
                >
                    <Avatar
                        aria-label="Recipe"
                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.user.userImage}`}
                    />
                </Button>
            }
            action={
                <MenuButton place={place} goToOtherUser={goToOtherUser} />
            }
            title={place.user.name}
        />
    )
}
export default PlaceCardHeader
