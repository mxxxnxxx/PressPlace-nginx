import { Box, Card, makeStyles, Typography } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC } from 'react'
import Loding from "../../../layout/components/pages/Loding"
import PressButton from "../../../place/components/atoms/PressButton"
import PageNextBack from "../../../place/components/molecules/PageNextBack"
import PlaceCardContent from "../../../place/components/molecules/PlaceCardContent"
import PlaceCardAction from "../../../place/containers/molecules/PlaceCardAction"
import PlaceCardHeader from '../../../place/containers/molecules/PlaceCardHeader'
import { Place } from "../../../place/types/Place"
import { Places } from "../../../place/types/Places"

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
    }
}))
const UserPlaces: FC<Props> = ({
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
                            <Card className='m-3' key={index.toString()}>
                                <PlaceCardHeader place={place} />
                                <PlaceCardContent place={place} />
                                {place.tags.length > 0 &&
                                    <PlaceCardAction place={place} />
                                }
                            </Card>
                        </Box>
                    ))
                    :
                    <Box className={classes.noSearched}>
                        <Typography className={classes.noPlace}>
                            まだPlaceを投稿していません
                        </Typography>
                        <PressButton />
                    </Box>
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
export default UserPlaces
