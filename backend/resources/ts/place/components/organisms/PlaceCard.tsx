import React, { FC, useCallback, useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
} from '@material-ui/core';
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert';
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode';
import { Places } from '../../types/Places';
import MenuButton from '../../components/molecules/MenuButton';


type Props = {
    paginatePlaces?: Places[];
    isLoading: boolean;
    statusCode?: number;
    loadMoreRef: (node: Element) => void;
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
};

const PlaceCard: FC<Props> = ({
    paginatePlaces,
    isLoading,
    statusCode,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
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
                <React.Fragment key={page.currentPage.toString()}>
                    {page.data.map((place, index) => (
                        <Card className='m-5' key={index.toString()}>
                            <CardHeader

                                // アバターアイコン
                                avatar={
                                    <Avatar aria-label="Recipe">
                                        <img src={`user_image/${place.user.userImage}`} />
                                    </Avatar>
                                }

                                action={
                                    // ... のmoreボタン
                                    // <IconButton>
                                    //     <MoreVertIcon />
                                    // </IconButton>
                                    <>
                                        <MenuButton place={place}/>
                                        {/* <PlaceMenu
                                            menuId={menuId}
                                            anchorEl={menuAnchorEl}
                                            open={isPlaceMenuOpen}
                                            handlePlaceMenuClose={handlePlaceMenuClose}
                                            place={place}
                                        /> */}
                                    </>
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
