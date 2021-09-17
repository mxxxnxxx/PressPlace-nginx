import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import React, { FC } from 'react'
import { User } from '../../types/User'

type Props = {
    menuId: string
    edge?: 'start' | 'end' | false
    handleAccountMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
    user: User | undefined | null
}

const AccountButton: FC<Props> = ({
    menuId,
    edge,
    handleAccountMenuOpen,
    user
}) => {
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
                    src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${user?.userImage}`}
                    alt="avatar"
                />
            </IconButton>
        </>
    )
}

export default AccountButton
