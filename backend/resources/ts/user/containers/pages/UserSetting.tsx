import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import UserSetting from '../../components/pages/UserSetting'
import { useDeleteUserMutation } from '../../hooks'
type Props = {}


const EnhancedUserSetting: FC<Props> = () => {
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
        <UserSetting
            statusCode={statusCode}
            isLoading={isLoading}
            handleDeleteUser={handleDeleteUser}
            error={error}
        />
    )
}
export default EnhancedUserSetting
