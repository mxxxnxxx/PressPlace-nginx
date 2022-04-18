import { Avatar, Box, Button, makeStyles, Paper, Typography } from "@material-ui/core"
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import FollowButton from "../../containers/atoms/FollowButton"
import FollowCounter from "../../containers/molecules/FollowCounter"
import { UserProfile } from "../../types/userProfile"

type Props = {
    userProfile?: UserProfile
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '85%',
        maxWidth: '36rem',
        marginTop: theme.spacing(3),
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userEditButton: {
        alignSelf: 'flex-end',
    },
    userProfileImage: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        maxWidth: '100%',
        minWidth: theme.spacing(7),
        marginTop: theme.spacing(4)
    },

    name: {
        margin: theme.spacing(1),
    },
    introduction: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(3),
    },
    introductionLabel: {
        alignItems: 'flex-start',
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '12px',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    introductionContent: {
        borderBottom: 'dashed thin',
        padding: theme.spacing(1),
        whiteSpace: 'pre-line',
    },
    followCounter: {
        borderTop: 'solid thin gray',
        borderBottom: 'solid thin gray'
    },



}))
const AuthUserProfile: FC<Props> = ({
    userProfile,
}) => {
    const classes = useStyles()

    return (
        <Paper className={classes.root} >
            <Box className={classes.userEditButton}>
                <Button
                    startIcon={<EditAttributesIcon />}
                    component={Link}
                    to="/user/edit"
                    variant="outlined"
                    size='small'
                >
                    編集
                </Button>
            </Box>

            <Avatar
                src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${userProfile?.user.userImage}`}
                alt="avatar"
                variant="rounded"
                className={classes.userProfileImage}
            />
            <Typography color="initial" className={classes.name}>
                {userProfile?.user.name}
            </Typography>
            {/* フォローボタン */}
            <Box>
                <FollowButton
                    followState={userProfile?.followState}
                    targetUser={userProfile?.user.id}
                />
            </Box>
            <Box className={classes.introduction}>
                {/* 自己紹介 */}
                <Typography color="initial" className={classes.introductionLabel}>
                    -自己紹介-
                </Typography>
                {userProfile?.user.introduction ?
                    <Typography color="initial" className={classes.introductionContent}>
                        {userProfile?.user.introduction}
                    </Typography>
                    :
                    <Typography color="initial" className={classes.introductionContent}>
                        自己紹介は未記入です
                    </Typography>
                }

            </Box>
            {/* フォローカウンター */}
            <Box className={classes.followCounter}>
                <FollowCounter
                    userProfile={userProfile}
                />
            </Box>

        </Paper>
    )
}
export default AuthUserProfile
