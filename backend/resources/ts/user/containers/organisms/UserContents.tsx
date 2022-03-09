import React, { useState } from 'react'
import { useParams } from 'react-router'
import UserContents from '../../components/organisms/UserContents'

const EnhancedUserContent: React.FC = () => {
    const { userName, contentsView } = useParams<{ userName: string, contentsView: string }>()

    return (
        <UserContents
            userName={userName}
            contentsView={contentsView}
        />

    )
}

export default EnhancedUserContent
