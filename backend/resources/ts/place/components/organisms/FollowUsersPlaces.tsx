import React from 'react'
import { Places } from '../../types/Places'
import { Place } from '../../types/Place'
import { Box, makeStyles } from '@material-ui/core'
import Masonry from 'react-masonry-css'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import PlaceCard from './PlaceCard'

type Props = {
    paginatePlaces?: Places[]
    statusCode?: number
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
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
    }
}))
const FollowUsersPlaces: React.FC<Props> = ({
    paginatePlaces,
    statusCode,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
}) => {
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        800: 1,
    }

    if (statusCode) {
        return (
            <>
                <Box height={48} px={2} />
                {statusCode === INTERNAL_SERVER_ERROR && (
                    <GeneralAlert
                        type="error"
                        title="サーバエラー"
                        content="予期しないエラーが発生し、placeの取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。"
                    />
                )}
            </>
        )
    }

    let loadMoreMessage
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...'
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' '
    }
    const classes = useStyle()
    return (
        <div className={classes.root}>
            {paginatePlaces?.map((page) => (
                <Box key={page.currentPage.toString()}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={classes.myMasonryGrid}
                        columnClassName={classes.myMasonryGridColumn}
                    >
                        {page.data.map((place: Place, index) => (
                            <div className={classes.card} key={index.toString()}>
                                <PlaceCard place={place} />
                            </div>
                        ))}
                    </Masonry>
                </Box>

            ))
            }

            <Box {...{ ref: loadMoreRef }} textAlign="center" className={classes.loadMessage}>
                {loadMoreMessage}
            </Box>
        </div>
    )
}
export default FollowUsersPlaces
