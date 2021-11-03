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
        width: theme.spacing(50),
        minWidth: theme.spacing(50)
    },
    followCounterLabel: {
        fontSize: 'smaller',
        textAlign: 'center',
        margin: theme.spacing(3)
    }
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
                <Box className={classes.followCounterLabel} >
                    <Button
                        onClick={() => goUserFollowingCount()}
                    >
                        <Typography variant="h4" color="initial">
                            {userProfile?.countFollowings}
                        </Typography>
                        <Typography color="initial">
                            フォロー数
                        </Typography>
                    </Button>
                </Box >

                {/* フォロワー数 */}
                <Box className={classes.followCounterLabel} >
                    <Button
                        onClick={() => goUserFollowerCount()}
                    >
                        <Typography variant="h4" color="initial">
                            {userProfile?.countFollowers}
                        </Typography>
                        <Typography color="initial">
                            フォロワー数
                        </Typography>
                    </Button>
                </Box >
            </Box>
        </>
    )
}
export default FollowCounter
