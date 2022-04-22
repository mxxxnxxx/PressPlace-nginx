import {
    Backdrop,
    Box,
    Button, Card, CardContent, CardHeader, CircularProgress,
    Container, TextField
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AxiosError } from 'axios'
import React, { FC } from 'react'
import { useForm } from "react-hook-form"
import RegisterAlert from '../molecules/RegisterAlert'
import TestUserInfo from '../organisms/TestUserInfo'
import Window from '../../../../../public/background_image/window.jpg'


type Inputs = {
    name: string
    age: number
    email: string
    password: string
}
type Props = {
    error: AxiosError<any> | null
    isLoading: boolean
    statusCode?: number
    onSubmit: (data: Inputs) => Promise<void>
}
const useStyle = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Window})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
}))
const numberRegExp = /^[0-9]+$/

const Register: FC<Props> = (
    {
        error,
        isLoading,
        statusCode,
        onSubmit
    }
) => {
    const classes = useStyle()
    const theme = useTheme()
    const { register, errors, handleSubmit, formState, getValues } = useForm({
        // 初回バリデーションのタイミング(mode)をonBlurに設定
        mode: "onBlur",
    })

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            className={classes.root}
        >
            <main style={{ flex: 1 }}>
                <Container maxWidth="xs">
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader
                            title="新規登録"
                            style={{ textAlign: 'center', marginTop: 30 }}
                        />
                        <TestUserInfo />
                        <CardContent>
                            {/* ここからフォーム */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    {statusCode && <RegisterAlert statusCode={statusCode} error={error} />}
                                    <TextField
                                        inputRef={register({
                                            required: "必須項目です",
                                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                                        })}
                                        label="お名前"
                                        variant="outlined"
                                        name="name"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(errors.name)}
                                        helperText={errors.name && errors.name.message}
                                    />
                                    <TextField
                                        inputRef={register({
                                            valueAsNumber: true,
                                            required: '必須項目です',
                                            pattern: {
                                                value: numberRegExp,
                                                message: '整数で入力してください',
                                            },
                                            min: {
                                                value: 18,
                                                message: '18以上の数字を入力してください',
                                            },
                                            max: {
                                                value: 100,
                                                message: '100以下の数字を入力してください',
                                            },
                                        })}
                                        label="年齢"
                                        variant="outlined"
                                        name="age"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(errors.age)}
                                        helperText={errors.age && errors.age.message}
                                    />
                                    <TextField
                                        inputRef={register({
                                            required: "必須項目です",
                                            maxLength: { value: 50, message: '50文字以内で入力してください' },
                                        })}
                                        label="メールアドレス"
                                        variant="outlined"
                                        name="email"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(errors.email)}
                                        helperText={errors.email && errors.email.message}
                                    />
                                    <TextField
                                        label="パスワード"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        margin="normal"
                                        autoComplete="current-password"
                                        fullWidth
                                        error={Boolean(errors.password)}
                                        inputRef={register({
                                            required: "必須項目です",
                                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                                            minLength: { value: 8, message: '8文字以上で入力してください' }
                                        })}
                                        helperText={errors.password && errors.password.message}
                                    />
                                    <TextField
                                        label="パスワード(確認)"
                                        type="password"
                                        variant="outlined"
                                        name="passwordConfirmation"
                                        margin="normal"
                                        autoComplete="current-password"
                                        fullWidth
                                        error={Boolean(errors.passwordConfirmation)}
                                        inputRef={register({
                                            required: "必須項目です",
                                            validate: {
                                                matchesPreviousPassword: value => {
                                                    const { password } = getValues()
                                                    return password === value || "パスワードは一致しません"
                                                }
                                            },
                                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                                            minLength: { value: 8, message: '8文字以上で入力してください' }
                                        })}
                                        helperText={errors.passwordConfirmation && errors.passwordConfirmation.message}
                                    />
                                    <Button variant={'contained'} type="submit" color="primary" disabled={!formState.isDirty || formState.isSubmitting}>登録</Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </main>

            {/* ローディング中の背景を変更 */}
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}


export default Register
