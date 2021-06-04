import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert';
import PlaceListHeader from '../molecules/PlaceListHeader';
import PlaceListItem from '../molecules/PlaceListItem';
import PlaceListItemSkeleton from '../molecules/PlaceListItemSkeleton';
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

const PlaceList: FC<Props> = ({
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
                <Box height={48} px={2} />
                {[1, 2, 3, 4, 5].map((value) => (
                    <PlaceListItemSkeleton key={value} />
                ))}
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
            {/* <PlaceListHeader
                // searchWord={searchWord}
                // handleChangeSearchWord={handleChangeSearchWord}
                handleAddPlace={handleAddPlace}
            /> */}
            {/* 140px = ヘッダー：64 + メモ一覧ヘッダー：48 + 下部余白：28 */}
            <List style={{ height: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
                {paginatePlaces?.map((page) => (
                    <React.Fragment key={page.currentPage}>
                        {page.data.map((place) => (
                            <PlaceListItem
                                key={place.placeId}
                                placeId={place.placeId}
                                name={place.name}
                                address={place.address}
                                handleSelectItem={handleSelectItem}
                            />
                        ))}
                    </React.Fragment>
                ))}
                <Box {...{ ref: loadMoreRef }} textAlign="center">
                    {loadMoreMessage}
                </Box>
            </List>
        </section>
    );
};

export default PlaceList;
