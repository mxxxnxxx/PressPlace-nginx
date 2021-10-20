import { Avatar, Button, CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import PlaceFavoriteButton from "../../containers/atoms/PlaceFavoriteButton"
import { Place } from "../../types/Place"
import MenuButton from "./MenuButton"

type Props = {
    place: Place
    goToOtherUser: (userName: string) => void
}
const useStyle = makeStyles(() => ({
    root: {
        opacity: '0.4',
        borderBottom: 'dashed thin',
        padding: '0',
        transitionDuration: '1s',
        "&:hover": {
            opacity: '1',
        }
    },
    title: {
        textDecoration: 'underline',
    },
    action: {
        alignSelf: 'center'
    },



}))

const PlaceCardHeader: React.FC<Props> = ({
    place,
    goToOtherUser,
}) => {
    const classes = useStyle()
    return (
        <CardHeader
            avatar={
                <Button
                    onClick={() => goToOtherUser(place.user.name)}
                >
                    <Avatar
                        aria-label="Recipe"
                        variant="rounded"
                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.user.userImage}`}
                    />
                </Button>
            }
            action={
                <>
                    <PlaceFavoriteButton
                        place={place}
                    />
                    <MenuButton place={place} goToOtherUser={goToOtherUser} />
                </>
            }
            title={place.user.name}
            className={classes.root}
            classes={{
                content: classes.title,
                action: classes.action
            }}
        />
    )
}
export default PlaceCardHeader
