import React, { useEffect } from 'react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import PlaceSearch from '../../components/molecules/PlaceSearch'
import useGetPlaceSearch from '../../hooks/useGetPlaceSearch'
import { Inputs } from '../../types/Inputs'

const EnhancedPlaceSearch: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/places/searched' }
    }
    const queryClient = useQueryClient()
    // shouldUnregisterは初期値を入れるためにfalseにしている
    const methods = useForm<Inputs>({ shouldUnregister: false, })
    const onSubmit = async (InputsData: Inputs): Promise<void> => {
        const { tag, name, comment, address } = InputsData
        if (
            name === "" &&
            comment === "" &&
            address === "" &&
            tag?.length === 0
        ) {
            // フォームが空の場合はPOSTしない
            return
        }
        // 前回の検索履歴の削除
        queryClient.removeQueries('PlaceSearched', { exact: false })
        // 検索ワードをキャッシュし移動 移動先のコンポーネントで検索
        queryClient.setQueryData('SearchedKey', InputsData)
        history.push(from)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <FormProvider {...methods}>
            <PlaceSearch
                onSubmit={onSubmit}
            />
        </FormProvider>
    )
}
export default EnhancedPlaceSearch
