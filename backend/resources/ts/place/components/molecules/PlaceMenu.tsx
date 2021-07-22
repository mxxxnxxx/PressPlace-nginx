import React, { FC, useState } from 'react';
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
    Button,
    Modal,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Place } from '../../types/Place';
import { User } from '../../../user/types/User';
import PlaceDelete from '../../containers/atoms/PlaceDelete';

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
                {user && user.id === place.user.id && (
                    <MenuItem>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <Button
                            href={`/place/edit/${place.id}`}
                            className={classes.sidebarMenuItem}
                        >
                            編集
                        </Button>
                    </MenuItem>
                )}
                {user && user.id === place.user.id && (
                    <PlaceDelete place={place}/>
                )}
            </MenuList>

        </Menu>

    );
};

export default PlaceMenu;
