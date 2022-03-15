import { Box, Button, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { Places } from '../../types/Places'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
type Props = {
    page: number
    setPage: (old: any) => void
    isPreviousData: boolean
    places?: Places
}
const useStyle = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        marginBottom: theme.spacing(4)
    },
    button: {
        margin: theme.spacing(2),
    },
}))
const PageNextBack: FC<Props> = ({
    page,
    setPage,
    isPreviousData,
    places
}) => {
    const classes = useStyle()
    return (
        <Box
            className={classes.root}
        >

            <Button
                onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
                disabled={page === 1}
                variant='contained'
                startIcon={<ArrowBackIosIcon />}
                className={classes.button}
            >
                Back
            </Button>
            <Button
                onClick={() => {
                    setPage((old: number) => old + 1)
                }}
                disabled={isPreviousData || places?.lastPage === page}
                variant='contained'
                endIcon={<ArrowForwardIosIcon />}
                className={classes.button}
            >
                Next
            </Button>
        </Box>
    )
}
export default PageNextBack
