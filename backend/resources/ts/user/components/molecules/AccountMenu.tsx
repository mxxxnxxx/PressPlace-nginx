import {
    Box,
    Divider,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuList,
    makeStyles,
    Typography,
    ListItemText
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { User } from '../../types/User'

const useStyles = makeStyles(() => ({
    sidebarMenuItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
}))

type Props = {
    menuId: string
    user: User | undefined | null
    anchorEl: Element | null
    open: boolean
    handleAccountMenuClose: VoidFunction
    handleLogout: VoidFunction
}

const AccountMenu: FC<Props> = ({
    menuId,
    user,
    anchorEl,
    open,
    handleAccountMenuClose,
    handleLogout,
}) => {
    const history = useHistory()
    const classes = useStyles()
    return (
        <Menu
            id={menuId}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            onClose={handleAccountMenuClose}
        >
            <ListItem style={{ outline: 'none', whiteSpace: 'nowrap' }}>
                <Box
                    maxWidth={150}
                    fontWeight="fontWeightBold"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {user?.name}
                </Box>
            </ListItem>
            <Divider />

            <MenuList>

                <MenuItem onClick={() => {
                    history.push('/mypage/myPlace')
                    handleAccountMenuClose()
                }}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        マイページ
                    </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    history.push('/user/setting')
                    handleAccountMenuClose()
                }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>設定</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    history.push('/terms')
                    handleAccountMenuClose()
                }}>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    {/* 一時的にtermsに 後にaboutにする */}
                    <ListItemText>ヘルプ</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>ログアウト</ListItemText>
                </MenuItem>

            </MenuList>

        </Menu>
    )
}

export default AccountMenu
