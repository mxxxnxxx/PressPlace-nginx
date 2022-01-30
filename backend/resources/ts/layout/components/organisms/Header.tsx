import React, { FC, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import AccountButton from '../../../user/components/atoms/AccountButton'
import AccountMenu from '../../../user/components/molecules/AccountMenu'
import CreateIcon from '@material-ui/icons/Create'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import SearchIcon from '@material-ui/icons/Search'
import { User } from '../../../user/types/User'
import PressButton from '../../../place/components/atoms/PressButton'
import PlaceSearchButton from '../../../place/components/atoms/PlaceSearchButton'

type Props = {
    user: User | undefined | null
    handleLogout: VoidFunction

}


const Header: FC<Props> = ({ user, handleLogout }) => {
    const theme = useTheme()
    const menuId = 'account-menu'

    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null)

    // メニューバーの状態 Boolean()でBooleanで値を返す
    const isAccouuntMenuOpen = Boolean(menuAnchorEl)

    const handleAccountMenuOpen = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchorEl(event.currentTarget)
        },
        []
    )

    const handleAccountMenuClose = useCallback(() => {
        setMenuAnchorEl(null)
    }, [])
    return (
        <>
            <AppBar
                position="sticky"
                style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.common.white,
                }}
            >
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h6"
                        style={{
                            flexGrow: 1,
                        }}
                        align="left"
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            PressPlace
                        </Link>
                    </Typography>

                    <PlaceSearchButton />

                    {user &&
                        <PressButton />
                    }


                    {/* ログインボタン */}
                    {!user && (
                        <Button
                            startIcon={<VpnKeyIcon />}
                            component={Link}
                            to="/login"
                            style={{ marginRight: theme.spacing(2) }}
                        >

                            ログイン
                        </Button>
                    )}

                    {!user && (
                        <Button
                            startIcon={<AccessibilityNewIcon />}
                            component={Link}
                            to="/register"
                        >
                            新規登録
                        </Button>
                    )}
                    {/* ユーザーメニュー */}
                    {user && (
                        <>
                            <AccountButton
                                user={user}
                                menuId={menuId}
                                handleAccountMenuOpen={handleAccountMenuOpen}
                            />
                            <AccountMenu
                                menuId={menuId}
                                user={user}
                                anchorEl={menuAnchorEl}
                                open={isAccouuntMenuOpen}
                                handleAccountMenuClose={handleAccountMenuClose}
                                handleLogout={handleLogout}
                            />
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
