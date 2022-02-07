import { Button, useTheme } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import React from 'react'
import { Link } from 'react-router-dom'

const PressButton: React.FC = () => {
    const theme = useTheme()
    return (
        <Button
            startIcon={<CreateIcon />}
            component={Link}
            to="/press"
            variant="outlined"
        >
            PRESS
        </Button>
    )
}
export default PressButton
