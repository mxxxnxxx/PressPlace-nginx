import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { UserProfile } from '../../types/userProfile'
type Props = {
    userProfile?: UserProfile
    goUserFollowingCount: () => void
    goUserFollowerCount: () => void
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    followCounter: {
        fontSize: 'smaller',
        textAlign: 'center',
        margin: theme.spacing(3)
    },
    followCount: {
        fontSize: '1.5rem',
        textAlign: 'center',
    },
    followCounterLabel: {
        fontSize: '0.7rem',
        textAlign: 'center',
    },

}))
const FollowCounter: React.FC<Props> = ({
    userProfile,
    goUserFollowingCount,
    goUserFollowerCount
}) => {
    const classes = useStyles()
    return (
        <>
            <Box className={classes.root}>
                {/* フォロー数 */}
                <Box className={classes.followCounter} >
                    <Button
                        onClick={() => goUserFollowingCount()}
                    >
                        <Typography className={classes.followCount} color="initial">
                            {userProfile?.countFollowings}
                        </Typography>
                    </Button>
                    <Typography className={classes.followCounterLabel} color="initial">
                        フォロー
                    </Typography>
                </Box>

                {/* フォロワー数 */}
                <Box className={classes.followCounter}>
                    <Button
                        onClick={() => goUserFollowerCount()}
                    >
                        <Typography className={classes.followCount} color="initial">
                            {userProfile?.countFollowers}
                        </Typography>
                    </Button>
                    <Typography className={classes.followCounterLabel} color="initial">
                        フォロワー
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
export default FollowCounter
