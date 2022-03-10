import React from 'react'
import { Places } from '../../types/Places'
import { Place } from '../../types/Place'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import Masonry from 'react-masonry-css'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import PlaceCard from './PlaceCard'
import { User } from '../../../user/types/User'
import LoginButton from '../../../user/containers/atoms/LoginButton'

type Props = {
    paginatePlaces?: Places[]
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    user?: User | null
}
const useStyle = makeStyles((theme) => ({
    root: {
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: theme.spacing(10),
    },
    myMasonryGrid: {
        display: 'flex',
        marginLeft: '-30px',
        width: 'auto',
    },
    myMasonryGridColumn: {
        paddingLeft: '30px',
        backgroundClip: 'padding-box'
    },
    card: {
        marginBottom: theme.spacing(10),
        margin: 'auto',
        maxWidth: '500px',
    },
    loadMessage: {
        margin: theme.spacing(2)
    },
    noPlace: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
const FollowUsersPlaces: React.FC<Props> = ({
    paginatePlaces,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    user
}) => {
    const classes = useStyle()
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1,
    }

    if (user === null || user === undefined) {
        return (
            <Paper className={classes.noPlace}>
                <Typography variant="h5" color="error" align='center'>
                    ログインしていません
                </Typography>
                <LoginButton />
            </Paper>
        )
    }
    const paginatePlacesData = paginatePlaces?.some((place) => {
        return (place.data.length === 0)
    })
    if (paginatePlacesData) {
        return (
            <Paper className={classes.noPlace}>
                <Typography variant="h5" color="error" align='center'>
                    placeがまだ投稿されていません
                </Typography>
            </Paper>
        )
    }
    let loadMoreMessage
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...'
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' '
    }

    return (
        <div className={classes.root}>
            {paginatePlaces?.map((page) => (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.myMasonryGrid}
                    columnClassName={classes.myMasonryGridColumn}
                    key={page.currentPage.toString()}
                >
                    {page.data.map((place: Place, index) => (
                        <div className={classes.card} key={index.toString()}>
                            <PlaceCard place={place} />
                        </div>
                    ))}
                </Masonry>
            ))
            }
            <Box {...{ ref: loadMoreRef }} textAlign="center" className={classes.loadMessage}>
                {loadMoreMessage}
            </Box>
        </div >
    )
}
export default FollowUsersPlaces
