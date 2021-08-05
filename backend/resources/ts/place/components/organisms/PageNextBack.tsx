import { Box, Button, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { Places } from '../../types/Places';
type Props = {
    page: number
    setPage: (old: any) => void
    isPreviousData: boolean
    places?: Places
}
const useStyle = makeStyles(() => ({
    nextBack: {
        textAlign: 'center',
    }
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
            className={classes.nextBack}
        >
            <Box>
                Page: {page}
            </Box>

            <Button
                onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
                disabled={page === 1}
            >
                Back
            </Button>
            <Button
                onClick={() => {
                    setPage((old: number) => old + 1)
                }}
                disabled={isPreviousData || places?.lastPage === page}
                className={classes.nextBack}
            >
                Next
            </Button>
        </Box>
    )
}
export default PageNextBack
