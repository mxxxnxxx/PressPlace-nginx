import React from 'react'
import { useParams } from 'react-router'
import Loding from '../../../layout/components/pages/Loding'
import UserChangedEmail from '../../components/pages/UserChangedEmail'
import useChangedEmail from '../../hooks/auth/useChangedEmail'
import useGetUserQuery from '../../hooks/useGetUserQuery'
const EnhancedUserChangedEmail: React.FC = () => {
    const { token } = useParams<{ token: string }>()
    const { data, isSuccess, isLoading } = useChangedEmail(token)
    const { refetch } = useGetUserQuery()
    isSuccess && refetch
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <UserChangedEmail
            data={data}
            isLoading={isLoading}
        />
    )
}
export default EnhancedUserChangedEmail
