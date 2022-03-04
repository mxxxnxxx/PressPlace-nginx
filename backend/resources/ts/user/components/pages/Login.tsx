import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { AxiosError } from 'axios'
import React, { FC } from 'react'
import UserChangePassword from '../../containers/organisms/UserResetPasswordSendForm'
import { Provider } from '../../types/OAuth'
import RegisterButton from '../atoms/RegisterButton'
import LegalLink from '../molecules/LegalLink'
import LoginAlert from '../molecules/LoginAlert'
import Tunnel from '/work/backend/public/background_image/tunnel.png'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Tunnel})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    decorationLine: {
        borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
        borderImageSlice: 1,
    },
    RegisterButton: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}))

type Props = {
    email: string
    password: string
    handleChangeEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void
    handleChangePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void
    statusCode?: number
    isLoading: boolean
    handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void
    handleSocialLoginRequest: (provider: Provider) => void
    error: AxiosError<any> | null
}

const Login: FC<Props> = ({
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    statusCode,
    isLoading,
    handleLogin,
    handleSocialLoginRequest,
    error
}) => {
    const theme = useTheme()
    const classes = useStyles()
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
                        <CardHeader title="ログイン" style={{ textAlign: 'center', marginTop: 30 }} />
                        <CardContent>
                            <Box p={2} borderBottom={1} className={classes.decorationLine}>
                            </Box>
                            <form onSubmit={handleLogin}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    {statusCode && <LoginAlert statusCode={statusCode} error={error} />}
                                    <TextField
                                        label="メールアドレス"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        margin="normal"
                                        required
                                        autoComplete="email"
                                        name="email"
                                        defaultValue={{ email: 'test@test.mail.com' }}
                                        autoFocus
                                        onChange={handleChangeEmail}
                                    />
                                    <TextField
                                        type="password"
                                        label="パスワード"
                                        variant="outlined"
                                        fullWidth
                                        value={password}
                                        margin="normal"
                                        name="password"
                                        defaultValue={{ password: 'testPlay' }}
                                        required
                                        autoComplete="current-password"
                                        onChange={handleChangePassword}
                                    />
                                    <Box my={2}>
                                        <LegalLink />
                                    </Box>
                                    <Box my={2}>
                                        <Button type="submit" color="primary" variant="contained">
                                            ログイン
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                            {/* パスワードリセット */}
                            <UserChangePassword />
                            <Box className={classes.RegisterButton}>
                                <RegisterButton />
                            </Box>
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

export default Login
