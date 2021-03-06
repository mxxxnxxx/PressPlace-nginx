import {
    Box,
    Divider,
    ListItem,
    ListItemIcon, ListItemText, Menu,
    MenuItem,
    MenuList
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { User } from '../../types/User'


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
                        ???????????????
                    </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    history.push('/user/setting')
                    handleAccountMenuClose()
                }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>??????</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                    history.push('/about')
                    handleAccountMenuClose()
                }}>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    {/* ????????????terms??? ??????about????????? */}
                    <ListItemText>PressPlace??????</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>???????????????</ListItemText>
                </MenuItem>

            </MenuList>

        </Menu>
    )
}

export default AccountMenu
