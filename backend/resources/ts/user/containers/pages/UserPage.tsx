import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import UserPage from '../../components/pages/UserPage'

const EnhancedUserPage: FC = () => {
    const { userName } = useParams<{ userName: string }>()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <UserPage userName={userName} />
    )
}
export default EnhancedUserPage
