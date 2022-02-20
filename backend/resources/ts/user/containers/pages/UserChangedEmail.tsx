import React from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import Loding from '../../../layout/components/pages/Loding'
import UserChangedEmail from '../../components/pages/UserChangedEmail'
import { useGetUserQuery } from '../../hooks'
import useChangedEmail from '../../hooks/auth/useChangedEmail'
const EnhancedUserChangedEmail: React.FC = () => {
    const queryClient = useQueryClient()
    const { token } = useParams<{ token: string }>()
    const { data, isSuccess, isLoading } = useChangedEmail(token)
    const { refetch } = useGetUserQuery({
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData('user', null)
        },
    })
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
