import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceSearchButton from '../../../place/components/atoms/PlaceSearchButton'
import PressButton from '../../../place/components/atoms/PressButton'
import AccountButton from '../../../user/components/atoms/AccountButton'
import RegisterButton from '../../../user/components/atoms/RegisterButton'
import AccountMenu from '../../../user/components/molecules/AccountMenu'
import { User } from '../../../user/types/User'
import TestMessageHeader from './TestMessageHeader'

type Props = {
    user: User | undefined | null
    handleLogout: VoidFunction

}
const useStyle = makeStyles((theme) => ({
    AppBar: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.common.white,
        boxShadow: 'none',
    },
    PlaceSearchButton: {
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(2)
        }
    },
    PressButton: {
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(2)
        }
    },
    LoginButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            marginRight: theme.spacing(2)
        }
    },
    RegisterButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    },
}))

const Header: FC<Props> = ({ user, handleLogout }) => {

    const classes = useStyle()
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
        <AppBar
            position="sticky"
            className={classes.AppBar}
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
                <Box className={classes.PlaceSearchButton}>
                    <PlaceSearchButton />
                </Box>
                <Box className={classes.PressButton}>
                    <PressButton />
                </Box>


                {/* ログインボタン */}
                {!user && (
                    <Button
                        startIcon={<VpnKeyIcon />}
                        component={Link}
                        to="/login"
                        className={classes.LoginButton}
                    >

                        ログイン
                    </Button>
                )}

                {!user && (
                    <Box className={classes.RegisterButton}>
                        <RegisterButton />
                    </Box>
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
            <TestMessageHeader />
        </AppBar>
    )
}

export default Header
