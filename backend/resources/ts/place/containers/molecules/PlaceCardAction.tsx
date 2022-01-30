import React from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router'
import PlaceCardAction from '../../components/molecules/PlaceCardAction'
import { Inputs } from '../../types/Inputs'
import { Place } from '../../types/Place'

type Props = {
    place: Place
}

const EnhancedPlaceCardAction: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/places/searched' }
    }
    const queryClient = useQueryClient()
    const tagSearch = async (tag: string) => {
        const InputData: Inputs | undefined = {
            tag: [tag],
            name: '',
            comment: '',
            address: '',
        }
        console.log(InputData.tag)
        // 前回の検索履歴の削除
        queryClient.removeQueries('PlaceSearched', { exact: false })
        // 検索ワードをキャッシュし移動 移動先のコンポーネントで検索
        queryClient.setQueryData('SearchedKey', InputData)
        history.push('/places/searched')
    }
    return (
        <PlaceCardAction
            place={place}
            tagSearch={tagSearch}
        />
    )
}
export default EnhancedPlaceCardAction
