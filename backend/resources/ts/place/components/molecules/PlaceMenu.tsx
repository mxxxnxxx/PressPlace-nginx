import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import { useCurrentUser } from '../../../user/hooks';
import { Link } from 'react-router-dom';
import {
    Box,
    Divider,
    Menu,
    MenuItem,
    MenuList,
    ListItem,
    ListItemIcon,
    Typography,
    makeStyles,
} from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Place } from '../../types/Place';
import { User } from '../../../user/types/User';

const useStyles = makeStyles(() => ({
    sidebarMenuItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

type Props = {
    menuId: string;
    anchorEl: Element | null;
    open: boolean;
    handlePlaceMenuClose: VoidFunction;
    place: Place;
};

const PlaceMenu: FC<Props> = ({
    menuId,
    anchorEl,
    open,
    handlePlaceMenuClose,
    place,
}) => {
    const user = useCurrentUser();
    const classes = useStyles();
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
                {/* <MenuItem>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <Link to="/terms" className={classes.sidebarMenuItem}>
                        ヘルプ
                    </Link>
                </MenuItem> */}
                {user && user.id === place.user.id && (
                    <MenuItem>
                        <ListItemIcon>
                            <EditTwoToneIcon />
                        </ListItemIcon>
                        <Link
                            to={'/place/edit/' + place.id}
                            className={classes.sidebarMenuItem}
                        >
                            <Typography variant="overline" color="initial">
                                編集
                            </Typography>
                        </Link>
                    </MenuItem>
                )}
            </MenuList>

        </Menu>
    );
};

export default PlaceMenu;
