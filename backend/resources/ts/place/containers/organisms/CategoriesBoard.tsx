import React, { useEffect } from 'react'
import { useCategoryContext } from '../../../context/CategoryContext'
import Loding from '../../../layout/components/pages/Loding'
import CategoriesBoard from '../../components/organisms/CategoriesBoard'
import useGetCategoriesPlacesQuery from '../../hooks/useGetCategoriesPlacesQuery'
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
