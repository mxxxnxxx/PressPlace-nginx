import { Avatar, Backdrop, Box, Card, CardContent, CardHeader, CardMedia, CircularProgress, makeStyles, Typography, useTheme } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC } from 'react'
import MenuButton from "../../../place/components/molecules/MenuButton"
import PlaceCardContent from "../../../place/components/molecules/PlaceCardContent"
import PlaceCardHeader from '../../../place/containers/molecules/PlaceCardHeader'
import PlaceCardMedia from "../../../place/components/molecules/PlaceCardMedia"
import PageNextBack from "../../../place/components/organisms/PageNextBack"
import { Place } from "../../../place/types/Place"
import { Places } from "../../../place/types/Places"
import Loding from "../../../layout/components/pages/Loding"

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
                {places?.total === 0 &&
                    <Box className={classes.noSearched}>
                        まだPlaceをpressしていません
                    </Box>
                }
                {places?.total && <PageNextBack page={page} setPage={setPage} isPreviousData={isPreviousData} places={places} />}

                {places?.data && places?.data?.map((place: Place, index) => (
                    <Card className='m-3' key={index.toString()}>
                        <PlaceCardHeader place={place} />
                        <PlaceCardMedia place={place} />
                        <PlaceCardContent place={place} />
                    </Card>
                ))}

                {places?.total && <PageNextBack page={page} setPage={setPage} isPreviousData={isPreviousData} places={places} />}
            </section>
        </Box>
    )
}
export default UserPlaces
