import React, { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import AccountButton from '../../user/atoms/AccountButton';
import AccountMenu from '../../user/molecules/AccountMenu';

type Props = {
    userName?: string;
    handleLogout: VoidFunction;
};

const Header: FC<Props> = ({ userName, handleLogout }) => {
    const theme = useTheme();
    const menuId = 'account-menu';

    // componentsには基本的にロジックを持たせないが、UIの状態に関するものなので、ここで定義している
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
    const isAccouuntMenuOpen = Boolean(menuAnchorEl);

    const handleAccountMenuOpen = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchorEl(event.currentTarget);
        },
        []
    );

    const handleAccountMenuClose = useCallback(() => {
        setMenuAnchorEl(null);
    }, []);

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
                        style={{ flexGrow: 1 }}
                        align="center"
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            OOUI-MEMO
            </Link>
                    </Typography>
                    {userName && (
                        <>
                            <AccountButton
                                menuId={menuId}
                                handleAccountMenuOpen={handleAccountMenuOpen}
                            />
                            <AccountMenu
                                menuId={menuId}
                                userName={userName}
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
    );
};

export default Header;
