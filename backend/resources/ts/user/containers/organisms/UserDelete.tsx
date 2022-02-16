import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import UserDelete from '../../components/organisms/UserDelete'
import { useDeleteUserMutation } from '../../hooks'

const EnhancedUserDelete: React.FC = () => {
    const history = useHistory()
    const { error, isLoading, mutate: deleteUser } = useDeleteUserMutation()
    const statusCode = error?.response?.status
    const handleDeleteUser = useCallback(() => {
        deleteUser(undefined, {
            onSuccess: () => {
                history.replace('/login')
            },
        })
        window.scrollTo(0, 0)
    }, [history, deleteUser])
    return (
        <UserDelete
            statusCode={statusCode}
            isLoading={isLoading}
            handleDeleteUser={handleDeleteUser}
            error={error}
        />
    )
}
export default EnhancedUserDelete
