import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PlaceList from '../../../place/components/organisms/PlaceList';
import { useGetPlaceListQuery, usePostPlaceMutation  } from '../../hooks';
import { useIntersectionObserver } from '../../../layout/hooks/util';

type Props = {
    placeId?: string;
};

const EnhancedPlaceList: FC<Props> = ({ placeId }) => {
    const {
        isFetching,
        isLoading,
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaceListQuery();
    const history = useHistory();
    const statusCode = error?.response?.status;

    // データ取得中でない + 画面幅が広い + メモ未選択時は、メモ一覧の一番新しいメモへ遷移
    // このままでよいか一度保留
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    useEffect(() => {
        const firstPlaceId = paginatePlaces?.pages[0]?.data[0].placeId;
        if (!isFetching && !placeId && matches && firstPlaceId) {
            history.push(`/${firstPlaceId}`);
        }
    }, [history, isFetching, paginatePlaces, placeId, matches]);

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    });

    const { mutate } = usePostPlaceMutation();
    const handleAddPlace = useCallback(() => {
        mutate({ title: '', content: '' });
    }, [mutate]);

    const handleSelectItem = useCallback(
        (selectPlaceId: string) => {
            history.push(`/${selectPlaceId}`);
        },
        [history]
    );

    return (
        <PlaceList
            paginatePlaces={paginatePlaces?.pages}
            isLoading={isLoading}
            statusCode={statusCode}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            handleAddPlace={handleAddPlace}
            handleSelectItem={handleSelectItem}
        />
    );
};

export default EnhancedPlaceList;