import React, { useCallback, useEffect, useState } from 'react'
import { useCurrentUser } from '../../../user/hooks'
import useDeleteUnfavoritePlace from '../../../user/hooks/useDeleteUnfavoritePlace'
import usePostFavoritePlace from '../../../user/hooks/usePostAddFavoritePlace'
import PlaceFavoriteButton from '../../components/atoms/PlaceFavoriteButton'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}

const EnhancedPlaceFavoriteButton: React.FC<Props> = ({
    place,
}) => {
    // ボタンの初期値の選定
    const initialize = (placeId: any, favoritePlacesIds?: number[]) => {
        if (favoritePlacesIds?.includes(placeId)) {
            return true
        } else if (favoritePlaces) {
            return false
        } else {
            return undefined
        }
    }
    const currentUser = useCurrentUser()
    const favoritePlaces: Place[] | undefined = currentUser?.favoritePlaces
    const favoritePlacesIds = favoritePlaces?.map((favoritePlace: Place) => {
        return favoritePlace.id
    })
    // ボタンのstate
    // undefinedがログイン前の状態 つまり ボタンがない状態
    // trueが お気に入りに登録済み つまり 削除ボタンの状態
    // falseが お気に入り未登録 つまり 登録ボタンの状態

    const [buttonState, setButtonState] = useState<boolean | undefined>(() => initialize(place.id, favoritePlacesIds))

    useEffect(() => {
        setButtonState(() => initialize(place.id, favoritePlacesIds))
    }, [favoritePlaces])

    // Favorite追加処理
    const addFavoriteMutate = usePostFavoritePlace()
    const addFavorite = useCallback((placeId: number) => {
        addFavoriteMutate.mutate(placeId, {
            onSuccess: async () => {
            }
        })
        setButtonState(true);
    }, [])
    // Favorite削除処理
    const unFavoriteMutate = useDeleteUnfavoritePlace()
    const unFavorite = useCallback((placeId: number) => {
        unFavoriteMutate.mutate(placeId, {
            onSuccess: () => {
            }
        })
        setButtonState(false);
    }, [])

    return (
        <PlaceFavoriteButton
            place={place}
            addFavorite={addFavorite}
            unFavorite={unFavorite}
            buttonState={buttonState}
        />
    )
}
export default EnhancedPlaceFavoriteButton
