import React, { useState } from 'react'
import { useParams } from 'react-router'
import UserContents from '../../components/organisms/UserContents'

const EnhancedUserContent: React.FC = () => {
    const { userName, contentsView } = useParams<{ userName: string, contentsView: string }>()
    const [value, setValue] = useState(contentsView)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index: string) => {
        setValue(index)
    }
    return (
        <UserContents
            userName={userName}
            value={value}
            handleChange={handleChange}
            handleChangeIndex={handleChangeIndex}
        />

    )
}

export default EnhancedUserContent
