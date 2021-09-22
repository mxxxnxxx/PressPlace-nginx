import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import UserSetting from '../../components/pages/UserSetting'
import { useDeleteUserMutation } from '../../hooks'
type Props = {}


const EnhancedUserSetting: FC<Props> = () => {
    return (
        <UserSetting
        />
    )
}
export default EnhancedUserSetting
