import { Box, Button, IconButton, makeStyles, useTheme } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
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
const PressButton: React.FC = () => {
    const classes = useStyle()
    const history = useHistory()
    return (
        <>
            <Box className={classes.PressButtonXs}>
                <IconButton
                    onClick={() => history.push("/press")}
                >
                    <CreateIcon />
                </IconButton>
            </Box>
            <Box className={classes.PressButtonSm}>
                <Button
                    startIcon={<CreateIcon />}
                    component={Link}
                    to="/press"
                    variant="outlined"
                >
                    PRESS
                </Button>
            </Box>
        </>
    )
}
export default PressButton
