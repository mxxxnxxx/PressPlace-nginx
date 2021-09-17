import { Avatar, Box, Button, makeStyles, Typography } from "@material-ui/core"
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import { AxiosError } from "axios"
import React, { FC } from 'react'
import { QueryObserverResult, RefetchOptions } from "react-query"
import { Link } from 'react-router-dom'
import Loding from "../../../layout/components/pages/Loding"
import FollowButton from "../../containers/atoms/FollowButton"
import FollowCounter from "../../containers/molecules/FollowCounter"
import { UserProfile } from "../../types/userProfile"

type Props = {
    userProfile?: UserProfile
    isLoading: boolean
    loginUserId?: boolean
    reGetUserProfile: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<UserProfile, AxiosError<any>>>
}
const useStyles = makeStyles(() => ({
    root: {
    },
    userProfile: {
        display: 'flex',
        justifyContent: 'center',
    },
    userEdit: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '20px',
        marginTop: '10px'
    },

}))
const UserProfile: FC<Props> = ({
    userProfile,
    isLoading,
    loginUserId,
    reGetUserProfile
}) => {
    const classes = useStyles()
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <Box className={classes.root}>
            {
                loginUserId &&
                <Box className={classes.userEdit}>
                    <Button
                        startIcon={<EditAttributesIcon />}
                        component={Link}
                        to="/user/edit"
                        variant="outlined"
                    >
                        プロフィール編集
                    </Button>
                </Box>
            }
            {/* ユーザー画像 */}
            <Box className={classes.userProfile}>
                {userProfile &&
                    <Avatar
                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${userProfile?.user.userImage}`}
                        alt="avatar"
                    />
                }
            </Box>
            <Box className={classes.userProfile}>
                {/* ユーザーname */}
                <Typography color="initial">
                    {userProfile?.user.name}
                </Typography>
            </Box>

            {/* フォローカウンター */}
            <Box className={classes.userProfile}>
                <FollowCounter
                    userProfile={userProfile}
                />
            </Box>

            {/* フォローボタン */}
            <Box className={classes.userProfile}>
                <FollowButton
                    followState={userProfile?.followState}
                    targetUser={userProfile?.user.id}
                />
            </Box>

            <Box className={classes.userProfile}>
                {/* 自己紹介 */}
                <Typography color="initial">
                    {userProfile?.user.introduction}
                </Typography>
            </Box>
        </Box >
    )
}
export default UserProfile
