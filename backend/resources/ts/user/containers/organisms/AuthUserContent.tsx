import React, { useState } from 'react'
import { useParams } from 'react-router'
import AuthUserContents from '../../components/organisms/AuthUserContents'
import useCurrentUser from '../../hooks/useGetCurrentUser'

const EnhancedAuthUserContent: React.FC = () => {
    const currentUser = useCurrentUser()
    const { contentsView } = useParams<{ contentsView: string }>()
    const [value, setValue] = useState(contentsView)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }

    return (
        <AuthUserContents
            userName={currentUser?.name}
            value={value}
            handleChange={handleChange}
        />
    )
}

export default EnhancedAuthUserContent
