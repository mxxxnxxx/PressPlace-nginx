import React, { FC, useEffect, useState } from 'react'
import { Inputs } from '../../types/Inputs'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { useSearchKeyContext } from '../../../context/SearchKeyContext'
import PlaceSearched from '../../components/organisms/PlaceSearched'
import useGetPlaceSearch from '../../hooks/useGetPlaceSearchQuery'

const EnhancedPlaceSearched: FC = () => {
    const history = useHistory()
    const location = useLocation()
    const { searchKey, dispatch } = useSearchKeyContext()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/places/searched' },
    }

    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const {
        data: places,
        isLoading,
        error,
        isPreviousData,
        refetch: getPlaceSearch
    } = useGetPlaceSearch(page, searchKey)

    const removeKey = (type: any, index?: number) => {
        queryClient.removeQueries('PlaceSearched', { exact: false });
        dispatch({ type: type, index: index });
        () => setPage(() => 1)
        getPlaceSearch
        history.push(from)
    }

    // searchKeyのすべての値が''かどうかチェックする
    const ToConfirmSearchKey = Object.values(searchKey).every((v) => {
        if (typeof v === 'object') {
            return v.every((v) => v == '')
        } else {
            return v == ''
        }
    })


    useEffect(() => {
        // 2ページ目以降があれば事前に次のページの情報を読み込む
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['PlaceSearched', page + 1], () =>
                getPlaceSearch
            )
        }
        if (
            // 検索ページで更新をかけるとundefinedになるのでフォームへ移動
            ToConfirmSearchKey
        ) {
            history.push('/places/search')
        }

        getPlaceSearch
        window.scrollTo(0, 0)
    }, [page, searchKey])

    return (
        <PlaceSearched
            places={places}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            error={error}
            isPreviousData={isPreviousData}
            searchKey={searchKey}
            removeKey={removeKey}
        />
    );
};

export default EnhancedPlaceSearched
