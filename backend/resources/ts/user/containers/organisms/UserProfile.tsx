import React, { FC } from 'react'
import Loding from '../../../layout/components/pages/Loding'
import UserProfile from "../../components/organisms/UserProfile"
import useGetUserProfileQuery from "../../hooks/useGetUserProfileQuery"

type Props = {
    userName: string
}

const EnhancedUserProfile: FC<Props> = ({ userName }) => {
    const {
        data: userProfile,
        isLoading,
        isFetching,
    } = useGetUserProfileQuery(userName)
    const loginUserId = userProfile?.loginUserId
    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
    return (
        <UserProfile
            userProfile={userProfile}
            loginUserId={loginUserId}
        />
    )
}
export default EnhancedUserProfile
