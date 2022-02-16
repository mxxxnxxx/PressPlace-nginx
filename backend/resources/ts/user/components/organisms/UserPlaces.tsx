import { Box, Card, makeStyles, Paper, Typography } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC } from 'react'
import Masonry from "react-masonry-css"
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
    PressButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}))
const UserPlaces: FC<Props> = ({
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
            <section>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.myMasonryGrid}
                    columnClassName={classes.myMasonryGridColumn}
                >
                    {places?.data && places?.data?.length > 0 ?

                        places?.data && places?.data?.map((place: Place, index) => (
                            <Card className={classes.card} key={index.toString()}>
                                <PlaceCardHeader place={place} />
                                <PlaceCardContent place={place} />
                                {place.tags.length > 0 &&
                                    <PlaceCardAction place={place} />
                                }
                            </Card>
                        ))

                        :
                        <Paper className={classes.noSearched}>
                            <Typography className={classes.noPlace}>
                                まだPlaceを投稿していません
                            </Typography>
                            <Box className={classes.PressButton}>
                                <PressButton />
                            </Box>
                        </Paper>
                    }
                </Masonry>
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
