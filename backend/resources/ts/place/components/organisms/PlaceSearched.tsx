import { Backdrop, Box, Card, CircularProgress, makeStyles, Typography } from '@material-ui/core'
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
import EnhancedPlaceCardAction from '../../containers/molecules/PlaceCardAction'
import searchedMap from '/work/backend/public/background_image/searchedMap.png'
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
    removeKey: (type: any, index?: number) => Promise<void>
}

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${searchedMap})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginBottom: theme.spacing(10),
        maxWidth: theme.spacing(80),
        minWidth: theme.spacing(65),
    },
    noSearchedText: {

        textAlign: 'center',
        color: 'red',
        fontSize: '22px',
        margin: theme.spacing(5)
    },
    placeSearchButton: {
        alignSelf: 'center',
        marginBottom: theme.spacing(5)
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
    InputsData,
    removeKey,

}) => {
    const theme = useTheme()
    const classes = useStyle()
    return (
        <section className={classes.root}>
            <SearchedWords places={places} InputsData={InputsData} removeKey={removeKey} />
            {places?.total == 0 &&
                <Card
                    className={classes.card}
                >
                    <Typography className={classes.noSearchedText} >
                        検索結果が見つかりませんでした
                    </Typography>
                    <Box className={classes.placeSearchButton}>
                        <PlaceSearchButton />
                    </Box>
                </Card>
            }
            {places?.data?.map((place: Place, index) => (
                <Card className={classes.card} key={index.toString()}>
                    <PlaceCardHeader place={place} />
                    <PlaceCardContent place={place} />
                    {place.tags.length > 0 &&
                        <EnhancedPlaceCardAction
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
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    )
}

export default PlaceSearched
