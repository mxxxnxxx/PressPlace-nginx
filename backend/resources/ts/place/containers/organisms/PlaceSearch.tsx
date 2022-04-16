import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { useSearchKeyContext } from '../../../context/SearchKeyContext'
import PlaceSearch from '../../components/molecules/PlaceSearch'
import { Inputs } from '../../types/Inputs'


// 検索処理の流れ
// 1.PlaceSearchコンポーネントにて 検索フォームレンダリング
// 2.onSubmit成功時 useSearchKeyContext()でグローバルに検索ワードを管理 & 成功時に / places / searchedに移動
// 3.PlaceSearchedコンポーネントにてuseSearchKeyContextのsearchKeyをuseGetPlaceSearchにわたし非同期処理
// 4.useGetPlaceSearchのreturnから検索結果が表示
// 5.useSearchKeyContextのsearchKeyの削除がおこなわれるとrefetch:getPlaceSearchの処理が走り再検索される
// 6.useSearchKeyContextのsearchKeyがすべて''になると ToConfirmSearchKeyがtrueになり '/places/search'に移動し処理の1番に戻る


const EnhancedPlaceSearch: React.FC = () => {
    const history = useHistory()
    // 検索ワードを保持するためuseSearchKeyContextを呼び出し
    const { dispatch } = useSearchKeyContext()
    const queryClient = useQueryClient()
    // shouldUnregisterは初期値を入れるためにfalseにしている
    const methods = useForm<Inputs>({ shouldUnregister: false, })
    const onSubmit = async (formData: Inputs): Promise<void> => {
        const { tag, name, comment, address } = formData
        if (
            name === "" &&
            comment === "" &&
            address === "" &&
            tag?.length === 0
        ) {
            // フォームが空の場合はPOSTしない
            return
        }
        // 前回の検索結果の削除
        queryClient.removeQueries('PlaceSearched', { exact: false })
        // 検索ワードをuseReducer+useContextで管理し移動
        // 検索の処理は移動先の EnhancedPlaceSearched で行う検索
        dispatch({ type: 'set', formData: formData })
        history.push('/places/searched')
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
