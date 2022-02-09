import { Box, Button, makeStyles, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
    SearchButtonXs: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    SearchButtonSm: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}))
const PlaceSearchButton: React.FC = () => {
    const classes = useStyle()
    const history = useHistory()
    return (
        <>
            <Box className={classes.SearchButtonXs}>
                <IconButton
                    onClick={() => history.push("/places/search")}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box className={classes.SearchButtonSm}>
                <Button
                    startIcon={<SearchIcon />}
                    component={Link}
                    variant="outlined"
                    to="/places/search"
                >
                    SEARCH
                </Button>
            </Box>
        </>
    )
}
export default PlaceSearchButton
