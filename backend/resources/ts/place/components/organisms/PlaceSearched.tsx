import { AppBar, Backdrop, Box, Card, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AxiosError } from 'axios'
import React, { FC } from 'react'
import Masonry from 'react-masonry-css'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import PlaceCardTagAction from '../../containers/molecules/PlaceCardTagAction'
import { Inputs } from '../../types/Inputs'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PageNextBack from '../molecules/PageNextBack'
import PlaceCardContent from '../molecules/PlaceCardContent'
import SearchedWords from '../molecules/SearchedWords'
import PlaceCard from './PlaceCard'
import Map from '../../../../../public/background_image/map.png'

type Props = {
    places?: Places
    page: number
    setPage: (old: any) => void
    isLoading: boolean
    error: AxiosError<any> | null
    data?: Places
    isPreviousData: boolean
    searchKey?: Inputs
    removeKey: (type: any, index?: number | undefined) => void
}

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    appBar: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.common.white,
        boxShadow: 'none'
    },

    SearchedPlaces: {
        width: '95%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: theme.spacing(10),
    },
    card: {
        margin: 'auto',
        maxWidth: '500px',
        marginBottom: theme.spacing(10),
    },
    noSearched: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(4),
        margin: theme.spacing(8),
        color: 'red',
    },
    noSearchedText: {
        textAlign: 'center',
        margin: theme.spacing(3)
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
}))

const PlaceSearched: FC<Props> = ({
    places,
    page,
    setPage,
    isLoading,
    error,
    data,
    isPreviousData,
    searchKey,
    removeKey,
}) => {
    const theme = useTheme()
    const classes = useStyle()
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1,
    }
    return (
        <Box className={classes.root}>
            <AppBar
                position="sticky"
                className={classes.appBar}
            >
                <SearchedWords places={places} searchKey={searchKey} removeKey={removeKey} />
            </AppBar>
            <Box className={classes.SearchedPlaces}>
                {places?.total == 0 &&
                    <Card
                        className={classes.noSearched}
                    >
                        <Typography className={classes.noSearchedText} color="initial">
                            検索結果が見つかりませんでした
                        </Typography>
                    </Card>
                }
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.myMasonryGrid}
                    columnClassName={classes.myMasonryGridColumn}
                >
                    {!(places?.total == 0) &&
                        places?.data?.map((place: Place, index) => (
                            <div className={classes.card} key={index.toString()}>
                                <PlaceCard place={place} />
                            </div>
                        ))}
                </Masonry>
                {places && places.total > 0 && <PageNextBack
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    places={places}
                />}

            </Box>
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress />
            </Backdrop>
        </Box>
    )
}

export default PlaceSearched
