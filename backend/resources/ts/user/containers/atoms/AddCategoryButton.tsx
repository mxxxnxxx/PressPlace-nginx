import React from 'react'
import { useForm } from 'react-hook-form'
import { useCategoryContext } from '../../../context/CategoryContext'
import Loding from '../../../layout/components/pages/Loding'
import usePostAddNewCategoryMutation from '../../../place/hooks/usePostAddNewCategoryMutation'
import AddCategoryButton from '../../components/atoms/AddCategoryButton'
const EnhancedAddCategoryButton: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const { addNewCategory } = useCategoryContext()
    const { isLoading } = usePostAddNewCategoryMutation()
    const methods = useForm({ shouldUnregister: false, })
    const onSubmit = async (data: { name: string }): Promise<void> => {
        const { name } = data
        addNewCategory(name)
        handleClose()
    }
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <AddCategoryButton
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onSubmit={onSubmit}
            methods={methods}
        />
    )
}
export default EnhancedAddCategoryButton
