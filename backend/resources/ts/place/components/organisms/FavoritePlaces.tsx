import { Box, Card, makeStyles, Paper, Typography } from '@material-ui/core'
import { AxiosError } from 'axios'
import React from 'react'
import Masonry from 'react-masonry-css'
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
        maxWidth: '500px',
    },
    myMasonryGrid: {
        display: 'flex',
        marginLeft: '-30px',
        width: 'auto',
    },
    myMasonryGridColumn: {
        paddingLeft: '30px',
        backgroundClip: 'padding-box'
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
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1,
    }
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <Box>
            {/* placeカード */}
            {places?.data && places?.data?.length > 0 ?
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.myMasonryGrid}
                    columnClassName={classes.myMasonryGridColumn}
                >
                    {places.data.map((place: Place, index) => (
                        <Card className={classes.card} key={index.toString()}>
                            <PlaceCardHeader place={place} />
                            <PlaceCardContent place={place} />
                            {place.tags.length > 0 &&
                                <PlaceCardAction place={place} />
                            }
                        </Card>
                    ))}
                </Masonry>
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
        </Box>

    )
}

export default FavoritePlaces
