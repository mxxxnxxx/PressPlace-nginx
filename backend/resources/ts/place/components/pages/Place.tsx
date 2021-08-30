import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import React, { FC } from 'react'
import PlaceCard from '../../containers/organisms/PlaceCard'

const Place: FC = () => {
    return (
        <Box>
            <main>
                <Container>
                    <PlaceCard />
                </Container>
            </main>
        </Box>
    )
}
export default Place
