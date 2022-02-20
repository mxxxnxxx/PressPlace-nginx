import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { InfiniteData } from 'react-query'
import Loding from '../../../layout/components/pages/Loding'
import { Place } from '../../../place/types/Place'
import FollowButton from '../../containers/atoms/FollowButton'
import { PaginateFollowUsers } from '../../types/PaginateFollowUsers'

type Props = {
    paginateUsers?: PaginateFollowUsers[]
    isLoading?: boolean
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    goToUserPage: (userName: string) => void

}
const useStyle = makeStyles((theme) => ({
    container: {
        borderBottom: 'solid 1px',
        marginBottom: '10px'
    },
    item2: {
        fontSize: '0.8rem'
    },
    noFavoriteUsers: {
        fontSize: '0.8rem'
    }
}))
const PlaceFavoriteUsers: React.FC<Props> = ({
    paginateUsers,
    isLoading,
    goToUserPage,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
}) => {
    const classes = useStyle()
    let loadMoreMessage
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...'
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' '
    }
    return (
        <Paper>
            <List
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        お気に入りにしているユーザー
                    </ListSubheader>
                }
            >
                {paginateUsers?.map((page) => (
                    <React.Fragment key={page.currentPage.toString()}>
                        {page.data.map((userProfile, index) => (
                            <ListItem
                                className={classes.container}
                                key={index.toString()}
                                button={true}
                                onClick={() => goToUserPage(userProfile.user.name)}
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
                                        followState={userProfile.followState}
                                        targetUser={userProfile.user.id}
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
                <Box style={{ padding: '16px' }}>
                    <Typography color="error" className={classes.noFavoriteUsers}>
                        お気に入りにしているユーザーはいません
                    </Typography>
                </Box>
            }
        </Paper >
    )
}
export default PlaceFavoriteUsers
