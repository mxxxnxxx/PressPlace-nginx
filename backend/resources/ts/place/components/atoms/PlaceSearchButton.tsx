import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { Link } from 'react-router-dom'

const PlaceSearchButton: React.FC = () => {
    return (
        <Button
            startIcon={<SearchIcon />}
            component={Link}
            variant="outlined"
            to="/places/search"
        >
            search
        </Button>
    )
}
export default PlaceSearchButton
