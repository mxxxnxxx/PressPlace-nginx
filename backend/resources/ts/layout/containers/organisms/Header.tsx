import React, { FC, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/organisms/Header'
import { toast } from 'react-toastify'
import useLogout from '../../../user/hooks/auth/useLogout'
import useCurrentUser from '../../../user/hooks/useGetCurrentUser'


const EnhancedHeader: FC = () => {
    const user = useCurrentUser()

    const history = useHistory()
    const { mutate } = useLogout()

    const handleLogout = useCallback(() => {
        mutate(undefined, {
            onSuccess: () => {
                history.push('/login')
                toast.info('ログアウトしました｡またお待ちしております｡')
            },
        })
    }, [history, mutate])

    return (
        <Header
            user={user}
            handleLogout={handleLogout}
        />
    )
}

export default EnhancedHeader
