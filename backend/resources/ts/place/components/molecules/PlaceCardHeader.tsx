import { Avatar, Button, CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { User } from "../../../user/types/User"
import PlaceFavoriteButton from "../../containers/atoms/PlaceFavoriteButton"
import { Place } from "../../types/Place"
import MenuButton from "./MenuButton"

type Props = {
    place: Place
    currentUser?: User | null
    goToUserPage: (userName: string, currentUserName?: string) => void
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
    avatar: {
        margin: '0',
    },
    action: {
        alignSelf: 'center',
        margin: '0',
    },
    name: {
        display: "-webkit-box",
        overflow: "hidden",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
    }
}))

const PlaceCardHeader: React.FC<Props> = ({
    place,
    currentUser,
    goToUserPage,
}) => {
    const classes = useStyle()
    return (
        <CardHeader
            className={classes.root}
            classes={{
                avatar: classes.avatar,
                action: classes.action,
            }}
            avatar={
                <>
                    <Button
                        onClick={() => {
                            goToUserPage(place.user.name, currentUser?.name)
                        }}
                    >
                        <Avatar
                            aria-label="Recipe"
                            variant="rounded"
                            src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.user.userImage}`}
                        />
                    </Button>
                </>
            }
            title={
                <div className={classes.name}>
                    <a
                        onClick={() => goToUserPage(place.user.name)}
                    >
                        {place.user.name}
                    </a>
                </div>
            }
            action={
                <>
                    <PlaceFavoriteButton
                        place={place}
                    />
                    <MenuButton place={place} goToUserPage={goToUserPage} />
                </>
            }
        />
    )
}
export default PlaceCardHeader
