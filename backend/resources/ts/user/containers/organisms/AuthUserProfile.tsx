import React from 'react'
import Loding from '../../../layout/components/pages/Loding'
import AuthUserProfile from "../../components/organisms/AuthUserProfile"
import { useCurrentUser } from '../../hooks'
import useGetUserProfileQuery from '../../hooks/useGetUserProfileQuery'

const EnhancedAuthUserProfile: React.FC = () => {
    const currentUser = useCurrentUser()
    const userName = currentUser?.name
    const {
        data: userProfile,
        isLoading,
        isFetching,
    } = useGetUserProfileQuery(userName, { refetchOnWindowFocus: false, })

    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
    return (
        <AuthUserProfile
            userProfile={userProfile}
        />
    )
}
export default EnhancedAuthUserProfile
