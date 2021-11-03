import React, { FC, useEffect } from 'react'
import AuthUserPage from '../../components/pages/AuthUserPage'

const EnhancedAuthUserPage: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <AuthUserPage />
    )
}
export default EnhancedAuthUserPage
