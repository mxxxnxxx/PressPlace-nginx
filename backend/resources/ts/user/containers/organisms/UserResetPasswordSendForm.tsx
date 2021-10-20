import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router'
import UserResetPasswordSendForm from '../../components/organisms/UserResetPasswordSendForm'
import useChangePassword from '../../hooks/auth/useResetPasswordSendMail'

const EnhancedUserResetPasswordSendForm: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/login' },
    }
    const methods = useForm<{ address: string }>()
    const { data, mutate: changePassword } = useChangePassword()
    const onSubmit = async (data: { email: string }) => {
        const { email } = data
        if (!email) {
            return
        }
        const formData = new FormData()
        formData.append('email', email)
        changePassword(formData,
            {
                onSuccess: () => {
                    history.replace(from)
                }
            }
        )
    }
    return (
        <FormProvider{...methods}>
            <UserResetPasswordSendForm
                onSubmit={onSubmit}
            />
        </FormProvider>
    )
}
export default EnhancedUserResetPasswordSendForm
