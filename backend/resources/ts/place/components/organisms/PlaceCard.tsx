import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert';
import PlaceCardHeader from '../molecules/PlaceCardHeader';
// import PlaceCardItem from '../molecules/PlaceCardItem';
// import PlaceCardItemSkeleton from '../molecules/PlaceCardItemSkeleton';
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode';
import { Places } from '../../types/Places';

type Props = {
    paginatePlaces?: Places[];
    isLoading: boolean;
    statusCode?: number;
    loadMoreRef: (node: Element) => void;
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
    // searchWord: string;
    // handleChangeSearchWord: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddPlace: VoidFunction;
    handleSelectItem: (selectPlaceId: string) => void;
};

const PlaceCard: FC<Props> = ({
    paginatePlaces,
    isLoading,
    statusCode,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    // searchWord,
    // handleChangeSearchWord,
    handleAddPlace,
    handleSelectItem,
}) => {
    if (isLoading) {
        return (
            <>
                {/* <Box height={48} px={2} />
                {[1, 2, 3, 4, 5].map((value) => (
                    <PlaceCardItemSkeleton key={value} />
                ))} */}
            </>
        );
    }

    if (statusCode) {
        return (
            <>
                <Box height={48} px={2} />
                {statusCode === INTERNAL_SERVER_ERROR && (
                    <GeneralAlert
                        type="error"
                        title="サーバエラー"
                        content="予期しないエラーが発生し、メモデータ取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。"
                    />
                )}
            </>
        );
    }

    let loadMoreMessage;
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...';
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' ';
    }

    return (
        <section>
            {/* <PlaceCardHeader
                // searchWord={searchWord}
                // handleChangeSearchWord={handleChangeSearchWord}
                handleAddPlace={handleAddPlace}
            /> */}
            {/* 140px = ヘッダー：64 + メモ一覧ヘッダー：48 + 下部余白：28 */}

            {paginatePlaces?.map((page) => (
                <React.Fragment key={page.currentPage}>
                    {page.data.map((place) => (
                        <Card className='m-5'>
                            <CardHeader

                                // アバターアイコン
                                avatar={
                                    <Avatar aria-label="Recipe">
                                        <img src={`user_image/${place.user.userImage}`} />
                                    </Avatar>
                                }

                                action={
                                    // ... のmoreボタン
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }

                                title={place.user.name}
                            // subheader={place.tags}

                            />
                            <CardMedia
                                // className={classes.media}
                                image={place.placeImages}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="subtitle1" color="initial">
                                    場所の名前
                                </Typography>

                                <Typography paragraph>
                                    {place.name}
                                </Typography>

                                <Typography variant="subtitle1" color="initial">
                                    住所
                                </Typography>

                                <Typography paragraph>
                                    {place.address}
                                </Typography>

                                <Typography variant="subtitle1" color="initial">
                                    コメント
                                </Typography>

                                <Typography>
                                    {place.comment}
                                </Typography>

                                <Typography>
                                    {place.createdAt}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </React.Fragment>
            ))}
            <Box {...{ ref: loadMoreRef }} textAlign="center">
                {loadMoreMessage}
            </Box>

        </section>
    );
};

export default PlaceCard;
