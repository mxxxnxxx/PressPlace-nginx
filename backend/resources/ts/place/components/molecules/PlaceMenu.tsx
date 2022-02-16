import {
    Button, ListItemIcon, ListItemText, makeStyles, Menu,
    MenuItem,
    MenuList
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'
import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCurrentUser } from '../../../user/hooks'
import PlaceDelete from '../../containers/molecules/PlaceDelete'
import { Place } from '../../types/Place'



const useStyles = makeStyles(() => ({
    sidebarMenuItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
}))

type Props = {
    menuId: string
    anchorEl: Element | null
    open: boolean
    handlePlaceMenuClose: VoidFunction
    place: Place
    goToUserPage: (userName: string, currentUserName?: string) => void
}

const PlaceMenu: FC<Props> = ({
    menuId,
    anchorEl,
    open,
    handlePlaceMenuClose,
    place,
    goToUserPage
}) => {
    const user = useCurrentUser()
    const classes = useStyles()
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
            onClose={handlePlaceMenuClose}
        >
            <MenuList>
                {user && user.id === place.user.id && (
                    <MenuItem onClick={() => history.push(`/place/edit/${place.id}`)}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText>編集</ListItemText>
                    </MenuItem>
                )}

                {user && user.id === place.user.id && (
                    <PlaceDelete place={place} />
                )}

                {user && user.id === place.user.id ? (
                    <MenuItem onClick={() => history.push('/mypage/myPlace')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>マイページ</ListItemText>
                    </MenuItem>
                ) :
                    <MenuItem onClick={() => { goToUserPage(place.user.name, user?.name) }}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>ユーザーページ</ListItemText>
                    </MenuItem>
                }
            </MenuList>

        </Menu>

    )
}

export default PlaceMenu
