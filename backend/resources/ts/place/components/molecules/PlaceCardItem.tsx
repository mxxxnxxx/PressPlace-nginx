// import React, { FC } from 'react';
// import Box from '@material-ui/core/Box';
// import CardItem from '@material-ui/core/CardItem';
// import CardItemIcon from '@material-ui/core/CardItemIcon';
// import CardItemText from '@material-ui/core/CardItemText';
// import AssignmentIcon from '@material-ui/icons/Assignment';

// type Props = {
//   placeId: string;
//   name: string;
//   address: string;
//   comment: string;
//   handleSelectItem: (placeId: string) => void;
// };

// const PlaceCardItem: FC<Props> = ({
//   placeId,
//   name,
//   address,
//   comment,
//   handleSelectItem,
// }) => (
//   <CardItem button onClick={() => handleSelectItem(placeId)}>
//     <CardItemIcon>
//       <AssignmentIcon />
//     </CardItemIcon>
//     <Box height={54} overflow="hidden">
//       <CardItemText
//         primary={name}
//         secondary={address}
//         primaryTypographyProps={{
//           noWrap: true,
//         }}
//         secondaryTypographyProps={{
//           noWrap: true,
//         }}
//       />
//       <CardItemText
//         primary={name}
//         secondary={comment}
//         primaryTypographyProps={{
//           noWrap: true,
//         }}
//         secondaryTypographyProps={{
//           noWrap: true,
//         }}
//       />
//     </Box>
    

//   </CardItem>
// );

// export default PlaceCardItem;
