import React from 'react'
import { Place } from '../../../place/types/Place'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'


type Props = {
    place: Place
}
const PlaceFavoriteUserGP: React.FC<Props> = ({ place }) => {
    return (
        <>
            {place.favoriteUsers?.length ?
                <AvatarGroup max={4}>
                    {place.favoriteUsers.map((user, index) => (
                        <Avatar
                            src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${user.userImage}`}
                            key={index.toString()}
                        />
                    ))}
                </AvatarGroup>
                :
                <>
                </>
            }
        </>
    )
}
export default PlaceFavoriteUserGP
