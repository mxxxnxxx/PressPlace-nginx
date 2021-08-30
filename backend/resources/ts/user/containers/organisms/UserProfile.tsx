import React, { FC } from 'react'
import { useQueryClient } from 'react-query'
import UserProfile from "../../components/organisms/UserProfile"
import useGetUserProfileQuery from "../../hooks/useGetUserProfileQuery"

type Props = {
    userId?: number
}

const EnhancedUserProfile: FC<Props> = ({ userId }) => {
    const {
        data: userProfile,
        isLoading
    } = useGetUserProfileQuery(userId)
    const loginUserId = userProfile?.loginUserId
    return (
        <UserProfile userProfile={userProfile} isLoading={isLoading} loginUserId={loginUserId} />
    )
}
export default EnhancedUserProfile
