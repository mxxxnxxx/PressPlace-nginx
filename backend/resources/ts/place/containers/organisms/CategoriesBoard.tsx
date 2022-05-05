import React, { useEffect, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import Loding from '../../../layout/components/pages/Loding'
import { useCategoryContext } from '../../../context/CategoryContext'
import EnhancedLogin from '../../../user/containers/pages/Login'
import CategoriesBoard from '../../components/organisms/CategoriesBoard'
import useGetCategoriesPlacesQuery from '../../hooks/useGetCategoriesPlacesQuery'
import { CategoriesArray } from '../../types/CategoriesArray'
const EnhancedCategoriesBoard: React.FC = () => {
    const {
        setCategoriesState,
    } = useCategoryContext()
    // データ取得
    const { data, isLoading, isSuccess } = useGetCategoriesPlacesQuery()
    // 横スクロール可能かをstateで管理
    useEffect(() => {
        if (isSuccess && data) {
            setCategoriesState(data)
        }
    }, [data])
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <CategoriesBoard />
    )
}
export default EnhancedCategoriesBoard
