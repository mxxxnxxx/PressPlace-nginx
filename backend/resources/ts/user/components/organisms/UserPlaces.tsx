// 現在 利用していません
import { Box, makeStyles, Paper, Typography } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC } from 'react'
import Masonry from "react-masonry-css"
import PressButton from "../../../place/components/atoms/PressButton"
import PageNextBack from "../../../place/components/molecules/PageNextBack"
import PlaceCard from "../../../place/components/organisms/PlaceCard"
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
        marginBottom: theme.spacing(10),
        margin: 'auto',
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
    return (
        <Box>
            {/* placeカード */}
            <section>
                {places?.data && places?.data?.length > 0 ?
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={classes.myMasonryGrid}
                        columnClassName={classes.myMasonryGridColumn}
                    >
                        {places.data.map((place: Place, index) => (
                            <div className={classes.card} key={index.toString()}>
                                <PlaceCard place={place} />
                            </div>
                        ))}
                    </Masonry>
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
