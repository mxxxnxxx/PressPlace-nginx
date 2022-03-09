import { Box, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import Masonry from 'react-masonry-css'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
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
const PlaceCards: FC<Props> = ({
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
            ))}

            <Box {...{ ref: loadMoreRef }} textAlign="center" className={classes.loadMessage}>
                {loadMoreMessage}
            </Box>
        </div>
    )
}

export default PlaceCards
