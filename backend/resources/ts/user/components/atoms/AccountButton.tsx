import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useCurrentUser } from '../../hooks'
import { Avatar } from '@material-ui/core'

type Props = {
    menuId: string
    edge?: 'start' | 'end' | false
    handleAccountMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const AccountButton: FC<Props> = ({ menuId, edge, handleAccountMenuOpen }) => {
    const currentUser = useCurrentUser()
    return (
        <>
            <IconButton
                edge={edge || false}
                aria-label="アカウントメニューを開く"
                aria-controls={menuId}
                aria-haspopup="menu"
                onClick={handleAccountMenuOpen}
                color="inherit"
            >
                <Avatar
                    src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${currentUser?.userImage}`}
                    alt="avatar"
                />
            </IconButton>
        </>
    )
}

export default AccountButton
