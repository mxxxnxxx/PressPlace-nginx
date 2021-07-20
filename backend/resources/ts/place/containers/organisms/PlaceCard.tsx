import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PlaceCard from '../../components/organisms/PlaceCard';
import { useGetPlaceCardQuery, usePostPlaceMutation } from '../../hooks';
import { useIntersectionObserver } from '../../../layout/hooks/util';

type Props = {};

const EnhancedPlaceCard: FC<Props> = () => {
    const {
        isFetching,
        isLoading,
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaceCardQuery();
    const history = useHistory();
    const statusCode = error?.response?.status;

    
    // このままでよいか一度保留
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    useEffect(() => {
        const firstPlaceId = paginatePlaces?.pages[0]?.data[0].placeId;
        if (!isFetching && matches && firstPlaceId) {
            history.push(`/${firstPlaceId}`);
        }
    }, [history, isFetching, paginatePlaces, matches]);

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    });

    return (
        <PlaceCard
            paginatePlaces={paginatePlaces?.pages}
            isLoading={isLoading}
            statusCode={statusCode}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    );
};

export default EnhancedPlaceCard;