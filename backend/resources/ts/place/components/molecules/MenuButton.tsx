import React, { FC, useState, useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlaceMenu from './PlaceMenu'
import { Place } from '../../types/Place'
type Props = {
    place: Place
    goToUserPage: (userName: string, currentUserName?: string) => void
}

const MenuButton: FC<Props> = ({
    place,
    goToUserPage
}) => {
    const menuId = "place-menu"
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null)

    // メニューバーの状態 Boolean()でBooleanで値を返す
    const isPlaceMenuOpen = Boolean(menuAnchorEl)

    const handlePlaceMenuOpen = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchorEl(event.currentTarget)
        },
        []
    )

    const handlePlaceMenuClose = useCallback(() => {
        setMenuAnchorEl(null)
    }, [])

    return (
        <>
            <IconButton
                aria-label="アカウントメニューを開く"
                aria-controls={menuId}
                aria-haspopup="menu"
                onClick={handlePlaceMenuOpen}
                color="inherit"
            >
                <MoreVertIcon />
            </IconButton>
            <PlaceMenu
                menuId={menuId}
                anchorEl={menuAnchorEl}
                open={isPlaceMenuOpen}
                handlePlaceMenuClose={handlePlaceMenuClose}
                place={place}
                goToUserPage={goToUserPage}
            />
        </>
    )
}

export default MenuButton
