import React, { FC } from 'react'
import UserProfile from "../../components/organisms/UserProfile"
import useGetUserProfileQuery from "../../hooks/useGetUserProfileQuery"

type Props = {
    userName: string
}

const EnhancedUserProfile: FC<Props> = ({ userName }) => {
    const {
        data: userProfile,
        isLoading,
        refetch: reGetUserProfile
    } = useGetUserProfileQuery(userName)
    const loginUserId = userProfile?.loginUserId
    return (
        <UserProfile
            userProfile={userProfile}
            isLoading={isLoading}
            loginUserId={loginUserId}
            reGetUserProfile={reGetUserProfile}
        />
    )
}
export default EnhancedUserProfile
