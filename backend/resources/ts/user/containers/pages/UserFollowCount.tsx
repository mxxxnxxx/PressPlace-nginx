import React, { useCallback, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import UserFollowCount from '../../components/pages/UserFollowCount'

const EnhancedUserFollowCount: React.FC = () => {
    const history = useHistory()
    const { userName, followView } = useParams<{ userName: string, followView: string }>()
    const [value, setValue] = useState<string>(followView)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }


    const goToOtherUser = useCallback(
        (userName: string) => {
            if (userName) {
                history.push(`/account/${userName}/myPlace`)
            }
        }, [])

    return (
        <UserFollowCount
            value={value}
            handleChange={handleChange}
            userName={userName}
            goToOtherUser={goToOtherUser}
        />
    )
}
export default EnhancedUserFollowCount
