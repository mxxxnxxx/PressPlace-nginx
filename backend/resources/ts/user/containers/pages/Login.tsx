import { AxiosError } from 'axios'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { RefetchOptions, QueryObserverResult } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import Login from '../../components/pages/Login'
import { useLogin, useOAuthUrl } from '../../hooks/auth'
import { Provider } from '../../types/OAuth'
import { User } from '../../types/User'
type Props = {
    getUserQuery: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<User, AxiosError<any>>>
}
const EnhancedLogin: FC<Props> = ({ getUserQuery }) => {
    const history = useHistory()
    const location = useLocation()

    // 論理和(||)で左から右に処理
    // locationのstateを代入なければルートへ
    // as{ from: string }でfromを型定義
    // fromに分割代入
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/' },
    }

    const { error, isLoading, mutate: login } = useLogin()
    const statusCode = error?.response?.status
    const { mutate: redirectOAuth } = useOAuthUrl()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeEmail = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(ev.target.value)
        },
        []
    )
    // useCallbackでフォーム上のあたいが変わったときだけレンダーされる
    const handleChangePassword = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(ev.target.value)
        },
        []
    )
    // useCallbackでフォーム上のあたいが変わったときだけレンダーされる
    const handleLogin = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault()
            if (!email || !password) {
                return
            }
            login(
                { email, password },
                {
                    onSuccess: () => {
                        getUserQuery()
                        history.replace(from)
                        getUserQuery()
                    },
                }
            )
        },
        [email, password, history, from, login]
    )

    const handleSocialLoginRequest = useCallback(
        (provider: Provider) => {
            redirectOAuth(provider)
        },
        [redirectOAuth]
    )
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Login
            email={email}
            password={password}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            statusCode={statusCode}
            isLoading={isLoading}
            handleLogin={handleLogin}
            handleSocialLoginRequest={handleSocialLoginRequest}
            error={error}
        />
    )
}

export default EnhancedLogin
