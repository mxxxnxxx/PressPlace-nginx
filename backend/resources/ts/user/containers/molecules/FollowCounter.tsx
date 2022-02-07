import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FollowCounter from '../../components/molecules/FollowCounter'
import { UserProfile } from '../../types/userProfile'
type Props = {
    userProfile?: UserProfile
}
const EnhancedFollowCounter: React.FC<Props> = ({
    userProfile
}) => {
    const history = useHistory()

    const goUserFollowingCount = () => {
        history.replace(`/account/count/${userProfile?.user.name}/following`)
    }
    const goUserFollowerCount = () => {
        history.push(`/account/count/${userProfile?.user.name}/follower`)
    }
    return (
        <FollowCounter
            userProfile={userProfile}
            goUserFollowingCount={goUserFollowingCount}
            goUserFollowerCount={goUserFollowerCount}

        />
    )

}
export default EnhancedFollowCounter
