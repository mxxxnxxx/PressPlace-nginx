import React, { FC, useEffect } from 'react'
import OtherUserPage from '../../components/pages/OtherUserPage'
import useOtherUserId from '../../hooks/useOtherUserId'

const EnhancedUserPage: FC = () => {
    const userId = useOtherUserId()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <OtherUserPage userId={userId} />
    )
}
export default EnhancedUserPage
