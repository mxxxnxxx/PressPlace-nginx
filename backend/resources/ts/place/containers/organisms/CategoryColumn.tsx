import React from 'react'
import CategoryColumn from '../../components/organisms/CategoryColumn'
import { Category } from '../../types/Category'
type Props = {
    category: Category
}
const EnhancedCategoryColumn: React.FC<Props> = ({
    category
}) => {
    return (
        <CategoryColumn category={category} />
    )
}
export default EnhancedCategoryColumn
