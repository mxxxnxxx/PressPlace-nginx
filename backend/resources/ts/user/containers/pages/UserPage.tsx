import React, { FC, useEffect } from 'react'
import UserPage from '../../components/pages/UserPage'
import { useCurrentUser } from '../../hooks'

const EnhancedUserPage: FC = () => {

    const currentUser = useCurrentUser()
    const userId = currentUser?.id
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <UserPage userId={userId} />
    )
}
export default EnhancedUserPage
