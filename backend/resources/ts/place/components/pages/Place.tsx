import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// import Hidden from '@material-ui/core/Hidden';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../../layout/containers/organisms/Header';
import PlaceList from '../../containers/organisms/PlaceList';

type Props = {
    placeId?:string;
}

const Place: FC<Props> = ({ placeId }) => {
    const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box>
            <Header />
            <main>
                <Container>
                    <PlaceList placeId={placeId}/>
                </Container>
            </main>
        </Box>
    )
}

export default Place;