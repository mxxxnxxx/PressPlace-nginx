import React from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { useSearchKeyContext } from '../../../context/SearchKeyContext'
import PlaceCardAction from '../../components/molecules/PlaceCardAction'
import { Inputs } from '../../types/Inputs'
import { Place } from '../../types/Place'

type Props = {
    place: Place
}

const EnhancedPlaceCardAction: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const queryClient = useQueryClient()
    const { dispatch } = useSearchKeyContext()

    const tagSearch = async (tag: string) => {
        const Inputs: Inputs | undefined = {
            tag: [tag],
            name: '',
            comment: '',
            address: '',
        }

        // 前回の検索履歴の削除
        queryClient.removeQueries('PlaceSearched', { exact: false })
        // 検索ワードをuseReducer+useContextで管理し移動
        // 検索の処理は移動先の EnhancedPlaceSearched で行う検索
        dispatch({ type: 'set', formData: Inputs })
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
