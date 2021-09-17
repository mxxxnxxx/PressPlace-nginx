import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import OtherUserPage from '../../components/pages/UserPage'

const EnhancedUserPage: FC = () => {
    const { userName } = useParams<{ userName: string }>()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <OtherUserPage userName={userName} />
    )
}
export default EnhancedUserPage
