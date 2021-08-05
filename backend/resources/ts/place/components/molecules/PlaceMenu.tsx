import React, { FC } from 'react';
import { useCurrentUser } from '../../../user/hooks';
import { Link } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    MenuList,
    ListItem,
    makeStyles,
    Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Place } from '../../types/Place';
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
                    <PlaceDelete place={place}/>
                )}
            </MenuList>

        </Menu>

    );
};

export default PlaceMenu;
