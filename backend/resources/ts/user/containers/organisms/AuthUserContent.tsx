import React, { useState } from 'react'
import { useParams } from 'react-router'
import AuthUserContents from '../../components/organisms/AuthUserContents'
import { useCurrentUser } from '../../hooks'

const EnhancedAuthUserContent: React.FC = () => {
    const currentUser = useCurrentUser()
    const { contentsView } = useParams<{ contentsView: string }>()
    const [value, setValue] = useState(contentsView)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index: string) => {
        setValue(index)
    }
    return (
        <AuthUserContents
            userName={currentUser?.name}
            value={value}
            handleChange={handleChange}
            handleChangeIndex={handleChangeIndex}
        />
    )
}

export default EnhancedAuthUserContent
