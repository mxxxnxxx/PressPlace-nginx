import { Box, Button, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { Places } from '../../types/Places'
type Props = {
    page: number
    setPage: (old: any) => void
    isPreviousData: boolean
    places?: Places
}
const useStyle = makeStyles((theme) => ({
    nextBack: {
        textAlign: 'center',
        marginBottom: theme.spacing(4)
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
            >
                Next
            </Button>
        </Box>
    )
}
export default PageNextBack
