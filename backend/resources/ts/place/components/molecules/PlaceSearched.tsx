import { Backdrop, Box, Card, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { AxiosError } from 'axios'
import React, { FC } from 'react'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Inputs } from '../../types/Inputs'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PlaceCardContent from './PlaceCardContent'
import SearchedWords from './SearchedWords'
import PageNextBack from './PageNextBack'
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
    InputsData?: Inputs
    removeKey: (type: any, index?: number | undefined) => void
}

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    SearchedPlaces: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        maxWidth: theme.spacing(80),
        minWidth: theme.spacing(65),
    },
    noSearched: {
        margin: theme.spacing(8),
        textAlign: 'center',
        color: 'red',
    },
    noSearchedText: {
        margin: theme.spacing(3)
    },
    nextBack: {
        textAlign: 'center',
    }
}))

const PlaceSearched: FC<Props> = ({
    places,
    page,
    setPage,
    isLoading,
    error,
    data,
    isPreviousData,
    InputsData,
    removeKey,

}) => {
    const theme = useTheme()
    const classes = useStyle()
    return (
        <section className={classes.root}>
            <Card>
                <SearchedWords places={places} InputsData={InputsData} removeKey={removeKey} />
            </Card>
            <Box className={classes.SearchedPlaces}>
                {places?.total == 0 &&
                    <Card
                        className={classes.noSearched}
                    >
                        <Box className={classes.noSearchedText}>
                            <Typography className={classes.noSearchedText} color="initial">
                                検索結果が見つかりませんでした
                            </Typography>
                            <PlaceSearchButton />
                        </Box>
                    </Card>
                }
                {places?.data?.map((place: Place, index) => (
                    <Card key={index.toString()}>
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
        </section>
    )
}

export default PlaceSearched
