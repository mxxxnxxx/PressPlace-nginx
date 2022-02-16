import { Box, Card, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import Masonry from 'react-masonry-css'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCardAction from '../../containers/molecules/PlaceCardAction'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'



type Props = {
    paginatePlaces?: Places[]
    isLoading?: boolean
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
const PlaceCard: FC<Props> = ({
    paginatePlaces,
    isLoading,
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
    if (isLoading) {
        return <Loding isLoading={isLoading} />
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
        <Box className={classes.root}>
            {paginatePlaces?.map((page) => (
                <Box key={page.currentPage.toString()}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={classes.myMasonryGrid}
                        columnClassName={classes.myMasonryGridColumn}
                    >
                        {page.data.map((place: Place, index) => (
                            <Card className={classes.card} key={index.toString()}>
                                <PlaceCardHeader place={place} />
                                <PlaceCardContent place={place} />
                                {place.tags.length > 0 &&
                                    <PlaceCardAction
                                        place={place}
                                    />
                                }
                            </Card>
                        ))}
                    </Masonry>
                </Box>

            ))
            }

            <Box {...{ ref: loadMoreRef }} textAlign="center" className={classes.loadMessage}>
                {loadMoreMessage}
            </Box>
        </Box>
    )
}

export default PlaceCard
