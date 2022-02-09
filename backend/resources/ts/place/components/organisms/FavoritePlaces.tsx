import { Box, Card, makeStyles, Paper, Typography } from '@material-ui/core'
import { AxiosError } from 'axios'
import React from 'react'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCardAction from '../../containers/molecules/PlaceCardAction'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PlaceSearchButton from '../atoms/PlaceSearchButton'
import PageNextBack from '../molecules/PageNextBack'

type Props = {
    places?: Places
    error: AxiosError<any> | null
    isLoading: boolean
    isPreviousData: boolean
    page: number
    setPage: (number: number) => void
}
const useStyle = makeStyles((theme) => ({
    noSearched: {
        textAlign: 'center',
        color: 'red',
        padding: theme.spacing(4)
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        maxWidth: theme.spacing(80),
        minWidth: theme.spacing(65),
    },
    nextBack: {
        textAlign: 'center',
    },
    noPlace: {
        marginBottom: theme.spacing(2)
    },
    PressSearchButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
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
                {places?.data && places?.data?.length > 0 ?
                    places?.data && places?.data?.map((place: Place, index) => (
                        <Box className={classes.card} key={index.toString()} >
                            <Card key={index.toString()}>
                                <PlaceCardHeader place={place} />
                                <PlaceCardContent place={place} />
                                {place.tags.length > 0 &&
                                    <PlaceCardAction place={place} />
                                }
                            </Card>
                        </Box>
                    ))
                    :
                    <Paper className={classes.noSearched}>
                        <Typography className={classes.noPlace} >
                            お気に入りの場所は登録されていません
                        </Typography>
                        <Box className={classes.PressSearchButton}>
                            <PlaceSearchButton />
                        </Box>
                    </Paper>
                }
                <PageNextBack
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    places={places}
                />
            </section>
        </Box>

    )
}

export default FavoritePlaces
