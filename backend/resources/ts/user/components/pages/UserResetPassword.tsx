import { Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, TextField, useTheme } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
type Props = {
    onSubmit: (data: {
        email: string;
        password: string;
    }) => void
    isLoading: boolean
}
const UserResetPassword: React.FC<Props> = ({
    onSubmit,
    isLoading
}) => {
    const methods = useFormContext()
    const theme = useTheme()
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <main style={{ flex: 1 }}>
                <Container maxWidth="xs">
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="パスワードの再設定" style={{ textAlign: 'center', marginTop: 30 }} />
                        <CardContent>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <TextField
                                        inputRef={methods.register({
                                            required: "必須項目です",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'メールアドレスの形式に合わせてください'
                                            }
                                        })}
                                        label="ご登録のEmailアドレス"
                                        variant="outlined"
                                        id="email"
                                        name="email"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(methods.errors.email)}
                                        helperText={methods.errors.email && methods.errors.email.message}
                                    />
                                    <TextField
                                        label="パスワード"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        margin="normal"
                                        autoComplete="current-password"
                                        fullWidth
                                        error={Boolean(methods.errors.password)}
                                        inputRef={methods.register({
                                            required: "必須項目です",
                                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                                            minLength: { value: 8, message: '8文字以上で入力してください' }
                                        })}
                                        helperText={methods.errors.password && methods.errors.password.message}
                                    />
                                    <TextField
                                        label="パスワード(確認)"
                                        type="password"
                                        variant="outlined"
                                        name="passwordConfirmation"
                                        margin="normal"
                                        autoComplete="current-password"
                                        fullWidth
                                        error={Boolean(methods.errors.passwordConfirmation)}
                                        inputRef={methods.register({
                                            required: "必須項目です",
                                            validate: {
                                                matchesPreviousPassword: value => {
                                                    const { password } = methods.getValues()
                                                    return password === value || "パスワードは一致しません"
                                                }
                                            },
                                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                                            minLength: { value: 8, message: '8文字以上で入力してください' }
                                        })}
                                        helperText={methods.errors.passwordConfirmation && methods.errors.passwordConfirmation.message}
                                    />
                                    <Button variant={'contained'} type="submit" color="primary" disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>登録</Button>
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
export default UserResetPassword
