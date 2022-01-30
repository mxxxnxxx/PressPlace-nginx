import React, { FC, useEffect, useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import PlaceSearched from '../../components/organisms/PlaceSearched'
import useGetPlaceSearch from '../../hooks/useGetPlaceSearchQuery'
import { Inputs } from '../../types/Inputs'
import { ActionType } from '../../types/ActionType'

const EnhancedPlaceSearched: FC = () => {
    const history = useHistory()
    const location = useLocation()

    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/places/searched' },
    }
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const Inputs: Inputs | undefined = queryClient.getQueryData('SearchedKey')
    const initialState = {
        name: Inputs?.name,
        address: Inputs?.address,
        comment: Inputs?.comment,
        tag: Inputs?.tag
    }


    const reducerFC = (keyWordState: Inputs, action: ActionType) => {
        // switchで処理を分ける
        // action.typeで処理を分岐
        // ...keyWordStateで処理前の状態を再現してからマージの処理を行う
        switch (action.type) {
            case 'name':
                return { ...keyWordState, name: '' }
            case 'address':
                return { ...keyWordState, address: '' }
            case 'comment':
                return { ...keyWordState, comment: '' }
            case 'tag':
                keyWordState?.tag?.splice(action.index, 1, '')
                return { ...keyWordState, tag: keyWordState?.tag }
        }
    }

    const [InputsData, dispatch] = useReducer(reducerFC, initialState)

    const {
        data: places,
        isLoading,
        error,
        isPreviousData,
        refetch: getPlaceSearch
    } = useGetPlaceSearch(page, InputsData)

    const removeKey = (type: any, index?: number) => {
        queryClient.removeQueries('PlaceSearched', { exact: false });
        dispatch({ type: type, index: index });
        () => setPage(() => 1)
        getPlaceSearch
        history.push(from)
    }

    useEffect(() => {
        // 2ページ目以降があれば事前に次のページの情報を読み込む
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['PlaceSearched', page + 1], () =>
                getPlaceSearch
            )
        }
        if (
            // 検索ページで更新をかけるとundefinedになるのでフォームへ移動
            Object.values(InputsData).every((v) => v == undefined)
        ) {
            history.push('/places/search')
        }
        window.scrollTo(0, 0)
        getPlaceSearch
        console.log('反応');

    }, [page, queryClient, InputsData, Inputs])

    return (
        <PlaceSearched
            places={places}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            error={error}
            isPreviousData={isPreviousData}
            InputsData={InputsData}
            removeKey={removeKey}
        />
    );
};

export default EnhancedPlaceSearched
