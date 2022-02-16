import { Avatar, Box, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Theme, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import Loding from '../../../layout/components/pages/Loding'
import FollowButton from '../../containers/atoms/FollowButton'
import { FollowUsers } from '../../types/FollowUsers'
import { UserProfile } from '../../types/userProfile'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        container: {
            borderBottom: 'thin solid',
            marginBottom: '10px'

        },
        item1: {

        },
        userImage: {

        },
        userName: {
        },
        item2: {

        },
        primary: {
            fontSize: '0.7rem'
        },
        introduction: {
        },
        item3: {
        },
        followButton: {
        },

    }),
);

type Props = {
    paginateUsers?: FollowUsers[]
    isLoading?: boolean
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    goToOtherUser: (userName: string) => void
}

const FollowingList: React.FC<Props> = ({
    paginateUsers,
    isLoading,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    goToOtherUser
}) => {
    const classes = useStyles();
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }

    let loadMoreMessage
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...'
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' '
    }
    return (
        <Paper className={classes.root} >
            <List component="nav" >
                {paginateUsers?.map((page) => (
                    <React.Fragment key={page.currentPage.toString()}>
                        {page.data.map((userProfile: UserProfile, index) => (
                            <ListItem
                                className={classes.container}
                                key={index.toString()}
                                button={true}
                                onClick={() => goToOtherUser(userProfile.user.name)}
                            >
                                <ListItemAvatar
                                    className={classes.item1}
                                >
                                    <Avatar
                                        variant="rounded"
                                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${userProfile.user.userImage}`}
                                    />
                                </ListItemAvatar>

                                <ListItemText
                                    className={classes.item2}
                                    primary={`${userProfile.user.name}`}
                                    classes={{
                                        primary: classes.primary
                                    }}
                                />
                                <ListItemSecondaryAction
                                    className={classes.item3}
                                >
                                    <FollowButton
                                        followState={userProfile?.followState}
                                        targetUser={userProfile?.user.id}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </React.Fragment>
                ))}
            </List>
            <Box {...{ ref: loadMoreRef }} textAlign="center">
                {loadMoreMessage}
            </Box>
            {
                paginateUsers?.[0].total == 0 &&
                <Box style={{ paddingBottom: '16px' }}>
                    <Typography variant="h6" color="error" align="center">
                        ※フォローしているユーザーがいません
                    </Typography>
                </Box>
            }
        </Paper>
    )
}
export default FollowingList
