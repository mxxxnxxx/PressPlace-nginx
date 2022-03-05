import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useTheme } from 'styled-components'
import FavoriteHelpGridContainer from '../../containers/organisms/FavoriteHelpGridContainer'
import FollowHelpGridContainer from '../../containers/organisms/FollowHelpGridContainer'
import GoHelpGridContainer from '../../containers/organisms/GoHelpGridContainer'
import PressHelpGridContainer from '../../containers/organisms/PressHelpGridContainer'
import SearchHelpGridContainer from '../../containers/organisms/SearchHelpGridContainer'
const useStyle = makeStyles((theme) => ({
    pageTitle: {
        margin: theme.spacing(12)
    },
    title: {
        "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
        fontSize: '2rem'
    },
    subTitle: {
        "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
        fontSize: '1rem'
    }
}))
const AboutPage: React.FC = () => {
    const classes = useStyle()
    return (
        <Box>
            <Box className={classes.pageTitle}>
                <Typography
                    className={classes.title}
                    align='center'
                >
                    PressPlaceの出来ること
                </Typography>
                <Typography className={classes.subTitle} align='center'>About this Service</Typography>
            </Box>
            <PressHelpGridContainer />
            <SearchHelpGridContainer />
            <FavoriteHelpGridContainer />
            <FollowHelpGridContainer />
            <GoHelpGridContainer />
        </Box>
    )
}
export default AboutPage
