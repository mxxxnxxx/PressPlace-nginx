import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

type Props = {
  placeId: string;
  name: string;
  address: string;
  handleSelectItem: (placeId: string) => void;
};

const PlaceListItem: FC<Props> = ({
  placeId,
  name,
  address,
  handleSelectItem,
}) => (
  <ListItem button onClick={() => handleSelectItem(placeId)}>
    <ListItemIcon>
      <AssignmentIcon />
    </ListItemIcon>
    <Box height={54} overflow="hidden">
      <ListItemText
        primary={name}
        secondary={address}
        primaryTypographyProps={{
          noWrap: true,
        }}
        secondaryTypographyProps={{
          noWrap: true,
        }}
      />
    </Box>
  </ListItem>
);

export default PlaceListItem;
