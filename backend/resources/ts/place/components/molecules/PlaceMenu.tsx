import {
    Button, makeStyles, Menu,
    MenuItem,
    MenuList
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../../../user/hooks'
import PlaceDelete from '../../containers/atoms/PlaceDelete'
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
    goToOtherUser: (userId: number) => void
}

const PlaceMenu: FC<Props> = ({
    menuId,
    anchorEl,
    open,
    handlePlaceMenuClose,
    place,
    goToOtherUser
}) => {
    const user = useCurrentUser()
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
            onClose={handlePlaceMenuClose}
        >
            <MenuList>
                {user && user.id === place.user.id && (
                    <MenuItem>
                        <Button
                            startIcon={<EditIcon />}
                            component={Link}
                            to={`/place/edit/${place.id}`}
                            className={classes.sidebarMenuItem}
                        >
                            編集
                        </Button>
                    </MenuItem>
                )}

                {user && user.id === place.user.id && (
                    <PlaceDelete place={place} />
                )}

                {user && user.id === place.user.id ? (
                    <Button
                        startIcon={<AccountCircleIcon />}
                        component={Link}
                        to={"/account/mypage"}
                        className={classes.sidebarMenuItem}
                    >
                        マイページ
                    </Button>
                ) :
                    <Button
                        startIcon={<AccountCircleIcon />}
                        className={classes.sidebarMenuItem}
                        onClick={() => { goToOtherUser(place.user.id) }}
                    >
                        ユーザーページ
                    </Button>
                }
            </MenuList>

        </Menu>

    )
}

export default PlaceMenu
