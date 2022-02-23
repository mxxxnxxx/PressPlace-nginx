import { Box, Grid, GridDirection, makeStyles, Typography } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import React from 'react'

type Props = {
    direction?: GridDirection
    Img: any
    helpParagraph: {
        title: string
        subTitle: string
        helpText: string
        linkButton?: JSX.Element
    }
}

const HelpGridContainer: React.FC<Props> = ({ direction, Img, helpParagraph }) => {
    const useStyle = makeStyles((theme) => ({
        image: {
            backgroundImage: `url(${Img})`,
            backgroundSize: 'cover',
            height: '450px'
        },
        helpTextGrid: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '450px',
            padding: theme.spacing(5)
        },
        title: {
            "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
            marginButton: theme.spacing(1),
            fontSize: '2.5rem'
        },
        subTitle: {
            "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
            marginButton: theme.spacing(2),
            fontSize: '0.9rem'
        },
        helpText: {
            "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
            fontSize: '0.8rem',
            whiteSpace: 'pre-wrap',
            margin: theme.spacing(3)
        },
        linkButton: {
            margin: theme.spacing(3)
        }
    }))
    const classes = useStyle()
    return (
        <Grid container={true} direction={direction}>
            <Grid item sm={6} xs={12} className={classes.image}>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.helpTextGrid}>
                <Typography variant="h5" color="initial" className={classes.title}>
                    {helpParagraph.title}
                </Typography>
                <Typography className={classes.subTitle}>
                    {helpParagraph.subTitle}
                </Typography>
                <Typography className={classes.helpText}>
                    {helpParagraph.helpText}
                </Typography>
                <ArrowDownwardIcon />
                <Box className={classes.linkButton}>
                    {helpParagraph.linkButton}
                </Box>
            </Grid>
        </Grid>
    )
}
export default HelpGridContainer
