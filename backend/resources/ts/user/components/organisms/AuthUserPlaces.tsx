import { Box, makeStyles, Paper, Typography } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC } from 'react'
import { CategoryProvider } from "../../../context/CategoryContext"
import PressButton from "../../../place/components/atoms/PressButton"
import Categories from "../../../place/containers/organisms/CategoriesBoard"
import { Places } from "../../../place/types/Places"
import EnhancedAddCategoryButton from "../../containers/atoms/AddCategoryButton"

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

    categoryPlaces: {
        // 親要素を無視して横幅いっぱい使う
        // 解説 https://hirakublog.com/css-side-full-screen/
        marginRight: 'calc(50% - 50vw)',
        marginLeft: 'calc(50% - 50vw)',
        overflow: 'auto'
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
const AuthUserPlaces: FC<Props> = ({
    places,
}) => {

    const classes = useStyle()
    return (
        <Box>
            {/* placeカード */}
            <section>
                {places?.data && places?.data?.length > 0 ?
                    <div className={classes.categoryPlaces}>
                        {/* リスト機能のapp */}
                        <Categories />
                    </div>
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
            </section>
        </Box>
    )
}
export default AuthUserPlaces
