import React, { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import PlaceSearched from '../../components/organisms/PlaceSearched'
import useGetPlaceSearch from '../../hooks/useGetPlaceSearch'
import { Inputs } from '../../types/Inputs'


const EnhancedPlaceSearched: FC = () => {
    const history = useHistory()
    const location = useLocation()

    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/places/searched' },
    }
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const InputsData: Inputs | undefined = queryClient.getQueryData('SearchedKey')
    const {
        data: places,
        isLoading,
        error,
        isPreviousData,
        refetch: getPlaceSearch
    } = useGetPlaceSearch(page, InputsData)

    const removeKey = (key?: string, index?: number) => {
        if (key === 'name' && InputsData?.name) { InputsData.name = "" }
        if (key === 'address' && InputsData?.address) { InputsData.address = "" }
        if (key === 'comment' && InputsData?.comment) { InputsData.comment = "" }
        if (key === 'tag' && !(index == undefined) && InputsData?.tag) { InputsData.tag[index] = "" }
        queryClient.removeQueries('PlaceSearched', { exact: false })
        queryClient.setQueryData('SearchedKey', InputsData);
        () => setPage(() => 1)
        getPlaceSearch
        history.push(from)
    }

    useEffect(() => {
        // 2ページ目以降があれば
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['PlaceSearched', page + 1], () =>
                getPlaceSearch
            )
        }
        window.scrollTo(0, 0)
    }, [page, queryClient])

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
