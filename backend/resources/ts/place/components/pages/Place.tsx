import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// import Hidden from '@material-ui/core/Hidden';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../../layout/containers/organisms/Header';
import PlaceCard from '../../containers/organisms/PlaceCard';

type Props = {
    placeId?:string;
}

const Place: FC<Props> = () => {
    const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box>
            <Header />
            <main>
                <Container>
                    <PlaceCard/>
                </Container>
            </main>
        </Box>
    )
}

export default Place;