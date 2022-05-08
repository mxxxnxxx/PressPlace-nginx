import React, { createContext, useContext, useState } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import usePostAddNewCategoryMutation from '../place/hooks/usePostAddNewCategoryMutation'
import usePostCategorySoftDeleteMutation from '../place/hooks/usePostCategorySoftDeleteMutation'
import usePostChangeCategoryMutation from '../place/hooks/usePostChangeCategoryMutation'
import usePostColumnOrderUpdateMutation from '../place/hooks/usePostColumnOrderUpdateMutation'
import usePostOrderNumberUpdateMutation from '../place/hooks/usePostOrderNumberUpdateMutation'
import { CategoriesArray } from '../place/types/CategoriesArray'
import { Category } from '../place/types/Category'

const Context = createContext({} as {
    categoriesState: CategoriesArray | undefined
    setCategoriesState: React.Dispatch<React.SetStateAction<CategoriesArray | undefined>>
    handleDragEnd: (result: DropResult) => void
    addNewCategory: (name: string) => void
    deleteCategory: (targetId: number, category: Category) => void
})

export function useCategoryContext() {
    return useContext(Context)
}

export function CategoryProvider({ children }: any) {

    const [categoriesState, setCategoriesState] = useState<CategoriesArray>()


    // Category自体の並び替え
    const { mutate: postColumnOrderUpdate } = usePostColumnOrderUpdateMutation()
    const categoryReorder = (
        categoriesState: CategoriesArray,
        startIndex: number,
        endIndex: number
    ) => {
        const update = categoriesState
        const removedCategory = update.splice(startIndex, 1)
        update.splice(endIndex, 0, removedCategory[0])

        // データベース更新
        const categoriesQuery = update.map(
            (category, index) => {
                return ({ id: category.id, newColumnOrder: index })
            })
        setCategoriesState(() => update)
        postColumnOrderUpdate(categoriesQuery)
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
    const { mutate: postChangeCategory } = usePostChangeCategoryMutation()
    const changeCategoryPlace = (
        categoriesState: CategoriesArray,
        source: DraggableLocation,
        destination: DraggableLocation
    ) => {
        const update = categoriesState
        // もともとのカテゴリーの定義 filterは配列として返すので分割代入
        const [sourceCategory] = update.filter(({ id }) => id.toString() === source.droppableId)
        // 移動先のカテゴリーの定義 filterは配列として返すので分割代入
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
        setCategoriesState(() => update)

        // // もともとのカテゴリーの定義 filterは配列として返すので分割代入
        // const [newSourceCategory] = categoriesState.filter(({ id }) => id.toString() === source.droppableId)
        // // 移動先のカテゴリーの定義 filterは配列として返すので分割代入
        // const [newDestinationCategory] = categoriesState.filter(({ id }) => id.toString() === destination.droppableId)
        const sourcePlacesQuery = sourcePlaces.map(
            (place, index) => {
                return ({ id: place.id, newCategoryOrder: index })
            }
        )
        const destinationPlacesQuery = destinationPlaces.map(
            (place, index) => {
                return ({ id: place.id, newCategoryOrder: index })
            }
        )
        const request = {
            sourcePlaces: sourcePlacesQuery,
            destinationPlaces: destinationPlacesQuery,
            targetPlaceId: removedPlace.id,
            destinationCategoryId: destinationCategory.id
        }
        postChangeCategory(request)
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

    // カテゴリーを追加する処理
    const { mutate: postAddNewCategory } = usePostAddNewCategoryMutation()
    const addNewCategory = async (name: string) => {
        if (!(categoriesState)) return
        postAddNewCategory(name,
            {
                onSuccess: (newCategory) => {
                    setCategoriesState(() => {
                        // laravel側でどうしてもplacesを空で取得できなかったため一時的に実装
                        newCategory['places'] = []
                        const up = categoriesState
                        const updated: CategoriesArray = [
                            ...up,
                            newCategory,
                        ]
                        return updated
                    })
                }
            })
    }

    // カテゴリーを削除する処理
    const { mutate: postCategorySoftDelete } = usePostCategorySoftDeleteMutation()
    const deleteCategory = (targetId: number, category: Category) => {
        const placeIds = category.places.map((place) => place.id)
        const request = {
            categoryId: targetId,
            placeIds: placeIds
        }
        postCategorySoftDelete(request, {
            onSuccess: (data) => setCategoriesState(() => data)
        })
    }


    const value = {
        categoriesState,
        setCategoriesState,
        handleDragEnd,
        addNewCategory,
        deleteCategory
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
