import React from 'react'
import Typography from '@material-ui/core/Typography'
import { User } from '../../types/User'
import { AxiosError } from 'axios'
import { ChangeEmailType } from '../../types/ChangeEmailType'
import { useFormContext } from 'react-hook-form'
import { Backdrop, Box, Button, CircularProgress, Paper, TextField, useMediaQuery, useTheme } from '@material-ui/core'

type Props = {
    user: User | null | undefined
    onSubmit: (data: ChangeEmailType) => Promise<void>
    isLoading: boolean
    statusCode?: number
    error: AxiosError<any> | null
}

const UserChangeEmail: React.FC<Props> = ({
    user,
    onSubmit,
    isLoading,
    statusCode,
    error
}) => {
    const methods = useFormContext()
    const theme = useTheme()

    return (
        <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            padding="50px"
            borderBottom="dashed"

        >

            <Typography
                variant="h5"
                color="initial"
            >
                メールアドレスの変更
            </Typography>
            <Typography
                color="initial"
            >
                現在のメールアドレス
            </Typography>
            <Typography
                variant="h6"
                color="initial"
            >
                {user?.email}
            </Typography>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextField
                    inputRef={methods.register({
                        required: "必須項目です",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'メールアドレスの形式に合わせてください'
                        },
                    })}
                    label="新しいEmailアドレス"
                    variant="outlined"
                    id="address"
                    name="address"
                    margin="normal"
                    fullWidth
                    error={Boolean(methods.errors.address)}
                    helperText={methods.errors.address && methods.errors.address.message}
                />

                <Box>
                    <Button
                        variant={'contained'}
                        type="submit"
                        disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>
                        登録
                    </Button>
                </Box>
            </form>
            <Backdrop
                style={{ zIndex: theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
export default UserChangeEmail
