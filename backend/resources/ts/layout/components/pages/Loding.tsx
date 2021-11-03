import { Backdrop, createStyles, makeStyles, Theme } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
type Props = {
    isLoading: boolean
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const Loding: React.FC<Props> = ({ isLoading }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

export default Loding
