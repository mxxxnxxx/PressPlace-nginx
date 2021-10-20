import { CancelToken } from 'axios'
import { stringify } from 'querystring'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useLocation, useParams } from 'react-router'
import { toast } from 'react-toastify'
import UserResetPassword from '../../components/pages/UserResetPassword'
import useResetPassword from '../../hooks/auth/useResetPassword'
const EnhancedUserResetPassword: React.FC = ({ }) => {
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/' },
    }
    const { token } = useParams<{ token: string }>()

    const methods = useForm()
    const { isLoading, mutate: resetPassword } = useResetPassword()
    const onSubmit = (data: { email: string, password: string }) => {
        const { email, password } = data
        if (!email || !password) { return }
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('token', token)

        resetPassword(formData, {
            onSuccess: () => {
                history.replace(from)
            },
            onError: () => {
                toast.error('入力に不備があります')
            }
        })
    }
    return (
        <FormProvider{...methods}>
            <UserResetPassword
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </FormProvider>
    )
}

export default EnhancedUserResetPassword
