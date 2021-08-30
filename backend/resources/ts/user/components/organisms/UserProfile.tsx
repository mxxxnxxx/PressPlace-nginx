import { Avatar, Box, Button, makeStyles, Typography } from "@material-ui/core"
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserProfile } from "../../types/userProfile"
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import Loding from "../../../layout/components/pages/Loding"

type Props = {
    userProfile?: UserProfile
    isLoading: boolean
    loginUserId?: boolean
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
    }
}))
const UserProfile: FC<Props> = ({
    userProfile,
    isLoading,
    loginUserId
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
                        to="/account/edit"
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
            <Box>
                {/* フォロワー */}
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
