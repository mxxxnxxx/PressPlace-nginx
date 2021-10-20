import { Box, Card, makeStyles } from '@material-ui/core'
import { AxiosError } from 'axios'
import React from 'react'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PageNextBack from '../molecules/PageNextBack'
import PlaceCardAction from '../molecules/PlaceCardAction'

type Props = {
    places?: Places
    error: AxiosError<any> | null
    isLoading: boolean
    isPreviousData: boolean
    page: number
    setPage: (number: number) => void
}
const useStyle = makeStyles(() => ({
    noSearched: {
        textAlign: 'center',
        color: 'red',
    },
    nextBack: {
        textAlign: 'center',
    }
}))
const FavoritePlaces: React.FC<Props> = ({
    places,
    page,
    setPage,
    isPreviousData,
    isLoading
}) => {
    const classes = useStyle()
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <Box>
            {/* placeカード */}
            <section>
                {places?.total === 0 &&
                    <Box className={classes.noSearched}>
                        まだPlaceをpressしていません
                    </Box>
                }
                {places?.total && <PageNextBack page={page} setPage={setPage} isPreviousData={isPreviousData} places={places} />}

                {places?.data && places?.data?.map((place: Place, index) => (
                    <Card className='m-3' key={index.toString()}>
                        <PlaceCardHeader place={place} />
                        <PlaceCardContent place={place} />
                        <PlaceCardAction place={place} />
                    </Card>
                ))}

                {places?.total && <PageNextBack page={page} setPage={setPage} isPreviousData={isPreviousData} places={places} />}
            </section>
        </Box>

    )
}

export default FavoritePlaces
