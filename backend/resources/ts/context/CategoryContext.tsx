import React, { createContext, useContext, useState } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import usePostOrderNumberUpdateMutation from '../place/hooks/usePostOrderNumberUpdateMutation'
import { CategoriesArray } from '../place/types/CategoriesArray'
import { PlacesQuery } from '../place/types/PlacesQuery'

const Context = createContext({} as {
    categoriesState: CategoriesArray | undefined
    setCategoriesState: React.Dispatch<React.SetStateAction<CategoriesArray | undefined>>
    handleDragEnd: (result: DropResult) => void
})

export function useCategoryContext() {
    return useContext(Context)
}

export function CategoryProvider({ children }: any) {

    const [categoriesState, setCategoriesState] = useState<CategoriesArray>()


    // Category自体の並び替え
    const categoryReorder = (
        categoriesState: CategoriesArray,
        startIndex: number,
        endIndex: number
    ) => {
        const update = categoriesState
        const removedCategory = update.splice(startIndex, 1)
        update.splice(endIndex, 0, removedCategory[0])
        setCategoriesState(update)
    }

    // Place自体の並び替え
    const { mutate: orderNumberUpdate } = usePostOrderNumberUpdateMutation()
    const placeReorder = (
        categoriesState: CategoriesArray,
        source: DraggableLocation,
        destination: DraggableLocation
    ) => {
        const update = categoriesState
        // filterメソッドでどのカテゴリーのplacesか特定 droppableIdでサーチ
        const [{ places }] = update.filter(({ id }) => id.toString() === source.droppableId)
        // 特定したplaces[配列]のなかで対象のplaceを削除しremovedPlaceで回収
        const removedPlace = places.splice(source.index, 1)
        // placesに目的の順番に挿入
        places.splice(destination.index, 0, removedPlace[0])
        // 仕上がったものでstate更新
        setCategoriesState(update)

        // placesの中身を整理
        const placesQuery = places.map(
            (place, index) => {
                return ({ id: place.id, newCategoryOrder: index })
            }
        )

        orderNumberUpdate(placesQuery)
    }



    // placeのカテゴリーを変更しつつ順番変更

    // 変更時のmutationでDBに保存

    const changeCategoryPlace = (
        categoriesState: CategoriesArray,
        source: DraggableLocation,
        destination: DraggableLocation
    ) => {
        const update = categoriesState
        // もともとのカテゴリーの定義
        const [sourceCategory] = update.filter(({ id }) => id.toString() === source.droppableId)
        // 移動先のカテゴリーの定義
        const [destinationCategory] = update.filter(({ id }) => id.toString() === destination.droppableId)

        // 更にカテゴリーからplacesの配列を定義
        const sourcePlaces = sourceCategory.places
        const destinationPlaces = destinationCategory.places

        // 対象のplaceをsourceから削除
        // spliceは配列で削除したplaceを返すため扱いやすいように分割代入している
        // 分割代入は配列型であれば[] オブジェクト型であれば{}
        const [removedPlace] = sourcePlaces.splice(source.index, 1)
        // 削除したものを代入
        destinationPlaces.splice(destination.index, 0, removedPlace)
        setCategoriesState(update)

    }




    // 同じカテゴリー内の順番変更か他のカテゴリへの移動か条件分岐
    const handlePlaceMove = (
        categoriesState: CategoriesArray,
        source: DraggableLocation,
        destination: DraggableLocation
    ) => {
        if (source.droppableId !== destination.droppableId) {
            changeCategoryPlace(categoriesState, source, destination)
        } else {
            placeReorder(categoriesState, source, destination)
        }
    }

    // ドラックして配置したあとの処理
    // 引数のresultで何をどこにドラックアンドドロップしたか検出し処理を分岐
    const handleDragEnd = (result: DropResult) => {
        // console.log(result)
        // 利用者がドロップの範囲ではないところでドロップした場合destinationはnullになる
        if (!(result.destination && categoriesState)) {
            return
        }
        const { source, destination } = result
        if (source.droppableId === 'all-columns') {
            categoryReorder(categoriesState, source.index, destination.index)
        } else {
            handlePlaceMove(categoriesState, source, destination)
        }
    }


    const value = {
        categoriesState,
        setCategoriesState,
        handleDragEnd
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
