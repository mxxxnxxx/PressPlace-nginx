import { Avatar, Box, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Theme, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import Loding from '../../../layout/components/pages/Loding'
import FollowButton from '../../containers/atoms/FollowButton'
import { PaginateFollowUsers } from '../../types/PaginateFollowUsers'
import { UserProfile } from '../../types/userProfile'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        container: {
            borderBottom: 'solid 1px',
            marginBottom: '10px'
        },
        item2: {
            fontSize: '0.8rem'
        },
    }),
);

type Props = {
    paginateFollowUsers?: PaginateFollowUsers[]
    isLoading?: boolean
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    goToOtherUser: (userName: string) => void
}

const FollowerList: React.FC<Props> = ({
    paginateFollowUsers,
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
                {paginateFollowUsers?.map((page) => (
                    <React.Fragment key={page.currentPage.toString()}>
                        {page.data.map((userProfile: UserProfile, index) => (
                            <ListItem
                                className={classes.container}
                                key={index.toString()}
                                button={true}
                                onClick={() => goToOtherUser(userProfile.user.name)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${userProfile.user.userImage}`}
                                    />
                                </ListItemAvatar>

                                <ListItemText
                                    className={classes.item2}
                                    primary={`${userProfile.user.name}`}
                                />
                                <ListItemSecondaryAction>
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
                paginateFollowUsers?.[0].total == 0 &&
                <Box style={{ paddingBottom: '16px' }}>
                    <Typography variant="h6" color="error" align="center">
                        ※フォローされているユーザーがいません
                    </Typography>
                </Box>
            }
        </Paper>
    )
}
export default FollowerList
