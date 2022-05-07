import { Box, Button, Card, makeStyles, Modal, TextField, Typography } from '@material-ui/core'
import { AddAlarm } from '@material-ui/icons'
import React from 'react'
import { FieldValues, UseFormMethods } from 'react-hook-form'
import { useCategoryContext } from '../../../context/CategoryContext'
type Props = {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    onSubmit: (data: {
        name: string;
    }) => Promise<void>,
    methods: UseFormMethods<FieldValues>

}

const useStyle = makeStyles((theme) => ({
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: theme.spacing(50),
        bgcolor: 'background.paper',
        // boxShadow: 24,
        p: 4,
        padding: theme.spacing(2)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center'
    }
}))
const AddCategoryButton: React.FC<Props> = ({
    open,
    handleOpen,
    handleClose,
    onSubmit,
    methods
}) => {
    const { addNewCategory } = useCategoryContext()
    const classes = useStyle()
    const { categoriesState } = useCategoryContext()
    return (
        <Box style={{ display: 'flex' }}>
            <Button className={classes.button} variant="contained" onClick={() => handleOpen()}>
                +
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card className={classes.modal}>
                    <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            inputRef={methods.register({
                                required: "必須項目です",
                                maxLength: { value: 15, message: '15文字以内で入力してください' },
                                validate: (value) => {
                                    const categoryNames = categoriesState?.map((category) => category.name)
                                    return !(categoryNames?.includes(value))
                                }
                            })}
                            label="カテゴリーの名前"
                            variant="outlined"
                            id="name"
                            name="name"
                            margin="normal"
                            fullWidth
                            error={Boolean(methods.errors.name)}
                            helperText={methods.errors.name && methods.errors.name.message}
                        />
                        <div>
                            <Typography align='left'>※同じ名前のカテゴリーは作成できません</Typography>
                            <Typography align='left'>※15文字以内で登録できます</Typography>
                        </div>
                        <Button variant={'contained'} type="submit" disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>登録</Button>
                    </form>
                </Card>
            </Modal>
        </Box>

    )
}
export default AddCategoryButton
