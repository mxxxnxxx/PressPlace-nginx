import React from 'react'
import AuthUserProfile from "../../components/organisms/AuthUserProfile"
import { useCurrentUser } from '../../hooks'
import useGetUserProfileQuery from '../../hooks/useGetUserProfileQuery'

const EnhancedAuthUserProfile: React.FC = () => {
    const currentUser = useCurrentUser()
    const userName = currentUser?.name
    const {
        data: userProfile,
        isLoading,
        refetch: reGetUserProfile
    } = useGetUserProfileQuery(userName)
    return (
        <AuthUserProfile
            userProfile={userProfile}
            isLoading={isLoading}
            reGetUserProfile={reGetUserProfile}
        />
    )
}
export default EnhancedAuthUserProfile
