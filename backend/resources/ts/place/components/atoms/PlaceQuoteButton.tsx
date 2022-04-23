import { Box, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
type Props = {
    placeId: number
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
const PlaceQuoteButton: React.FC<Props> = ({ placeId }) => {
    const classes = useStyle()
    const history = useHistory()
    return (
        <>
            <Box className={classes.PressButtonXs}>
                <IconButton
                    onClick={() => history.push(`/press/quote/${placeId}`)}
                >
                    <FileCopyIcon />
                </IconButton>
            </Box>
            <Box className={classes.PressButtonSm}>
                <IconButton
                    onClick={() => history.push(`/press/quote/${placeId}`)}
                >
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
