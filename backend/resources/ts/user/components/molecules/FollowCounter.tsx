import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { UserProfile } from '../../types/userProfile'
type Props = {
    userProfile?: UserProfile
    goUserFollowingCount: () => void
    goUserFollowerCount: () => void
}
const useStyles = makeStyles(() => ({
    followCounterLabel: {
        fontSize: 'smaller',
        textAlign: 'center',
        margin: '20px'
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
        </>
    )
}
export default FollowCounter
