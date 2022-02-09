import { AppBar, Backdrop, Box, Card, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AxiosError } from 'axios'
import React, { FC } from 'react'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Inputs } from '../../types/Inputs'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PlaceCardContent from '../molecules/PlaceCardContent'
import SearchedWords from '../molecules/SearchedWords'
import PageNextBack from '../molecules/PageNextBack'
import PlaceCardAction from '../../containers/molecules/PlaceCardAction'
import Map from '/work/backend/public/background_image/map.png'
import PlaceSearchButton from '../atoms/PlaceSearchButton'

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50%',
        marginTop: theme.spacing(10),
        maxWidth: theme.spacing(80),
        minWidth: theme.spacing(65),
    },
    card: {
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
                        <PlaceSearchButton />
                    </Card>
                }
                {places?.data?.map((place: Place, index) => (
                    <Card className={classes.card} key={index.toString()}>
                        <PlaceCardHeader place={place} />
                        <PlaceCardContent place={place} />
                        {place.tags.length > 0 &&
                            <PlaceCardAction
                                place={place}
                            />
                        }
                    </Card>
                ))}
                {places && places.total > 0 && <PageNextBack
                    page={page}
                    setPage={setPage}
                    isPreviousData={isPreviousData}
                    places={places}
                />}

            </Box>
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box >
    )
}

export default PlaceSearched
