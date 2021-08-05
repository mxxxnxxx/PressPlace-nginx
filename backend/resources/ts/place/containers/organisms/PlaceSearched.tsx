import React, { FC, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import PlaceSearched from '../../components/organisms/PlaceSearched';
import useGetPlaceSearch from '../../hooks/useGetPlaceSearch';
import { Inputs } from '../../types/Inputs';
import { Places } from '../../types/Places';
type Props = {};

const EnhancedPlaceSearched: FC<Props> = () => {
    const history = useHistory();
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient();
    const InputsData: Inputs | undefined = queryClient.getQueryData('SearchedKey');
    const removeKey = (key: string) => {
        key === 'name' && (delete InputsData?.name)
        key === 'address' && (delete InputsData?.address)
        key === 'comment' && (delete InputsData?.comment)
        queryClient.setQueryData('SearchedKey', InputsData)
    }
    const { data, isLoading, error, isPreviousData, refetch: getPlaceSearch } = useGetPlaceSearch(page, InputsData)
    useEffect(() => {
        // 2ページ目以降があれば

        if (!(data?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['PlaceSearched', page + 1], () =>
                getPlaceSearch
            )
        }

    }, [page, queryClient])

    return (
        <PlaceSearched
            places={data}
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

export default EnhancedPlaceSearched;