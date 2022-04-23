import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const useStyle = makeStyles((theme) => ({
    PressButtonXs: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    PressButtonSm: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
}))
const PlaceQuoteButton: React.FC<Props> = ({ place }) => {
    const classes = useStyle()
    const history = useHistory()
    return (
        <>
            <Box className={classes.PressButtonXs}>
                <IconButton
                    onClick={() => history.push(`/press/quote/${place.id}`)}
                >
                    {place.quoteCount > 0 && place.quoteCount}
                    <FileCopyIcon />
                </IconButton>
            </Box>
            <Box className={classes.PressButtonSm}>
                <IconButton
                    onClick={() => history.push(`/press/quote/${place.id}`)}
                >
                    {place.quoteCount > 0 && place.quoteCount}
                    <FileCopyIcon />
                    <Typography style={{ fontSize: '1rem' }} color="initial">
                        Quote
                    </Typography>
                </IconButton>
            </Box>
        </>
    )
}
export default PlaceQuoteButton
