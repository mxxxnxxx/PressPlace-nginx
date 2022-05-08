import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { useCategoryContext } from '../../../context/CategoryContext'
import Loding from '../../../layout/components/pages/Loding'
import CategoryDeleteButton from '../../components/atoms/CategoryDeleteButton'
import usePostCategorySoftDeleteMutation from '../../hooks/usePostCategorySoftDeleteMutation'
import { Category } from '../../types/Category'
type Props = {
    provided: DraggableProvided
    category: Category
}
const EnhancedCategoryDeleteButton: React.FC<Props> = ({
    provided,
    category
}) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const { deleteCategory } = useCategoryContext()
    const { isLoading } = usePostCategorySoftDeleteMutation()
    const onSubmit = (categoryId: number) => {
        deleteCategory(categoryId, category)
    }

    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }

    return (
        <CategoryDeleteButton
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            provided={provided}
            category={category}
            onSubmit={onSubmit}
        />
    )
}
export default EnhancedCategoryDeleteButton
