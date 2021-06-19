import React, { FC } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { AxiosError } from 'axios';
import RegisterAlert from '../molecules/RegisterAlert';
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Card,
    CardHeader,
    CardContent,
    TextField,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Header from '../../../layout/containers/organisms/Header';
import LegalLink from '../molecules/LegalLink';
import Footer from '../../../layout/components/organisms/Footer';
import { useRegister } from '../../hooks/auth';
import { kMaxLength } from 'buffer';

const useStyles = makeStyles(() => ({
    decorationLine: {
        borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
        borderImageSlice: 1,
    },
}));
type Inputs = {
    name: string
    age: number
    email: string
    password: string
};
type Props = {
    error: AxiosError<any> | null
    isLoading: boolean
    statusCode?: number
    onSubmit: (data: Inputs) => Promise<void>
}
const numberRegExp = /^[0-9]+$/

const Register: FC<Props> = (
    {
        error,
        isLoading,
        statusCode,
        onSubmit
    }
) => {
    const theme = useTheme();
    const { register, errors, handleSubmit, formState, getValues } = useForm({
        // 初回バリデーションのタイミング(mode)をonBlurに設定
        mode: "onBlur",
    });

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <main style={{ flex: 1 }}>
                <Container maxWidth="xs">
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="Register" style={{ textAlign: 'center' }} />
                        <CardContent>
                            {/* ここからフォーム */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    {statusCode && <RegisterAlert statusCode={statusCode} error={error}/>}
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
                                                    const { password } = getValues();
                                                    return password === value || "パスワードは一致しません";
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
            <Footer />

            {/* ローディング中の背景を変更 */}
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}


export default Register;