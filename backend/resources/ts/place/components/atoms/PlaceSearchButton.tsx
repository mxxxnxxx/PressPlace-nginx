import { Button, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useTheme from '@material-ui/core/styles/useTheme'
import React from 'react'
import { Link } from 'react-router-dom'

const PlaceSearchButton: React.FC = () => {
    const theme = useTheme()
    return (
        <Button
            startIcon={<SearchIcon />}
            component={Link}
            variant="outlined"
            to="/places/search"
        >
            SEARCH
        </Button>
    )
}
export default PlaceSearchButton
