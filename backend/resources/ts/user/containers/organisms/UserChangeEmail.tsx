import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router'
import UserChangeEmail from '../../components/organisms/UserChangeEmail'
import useChangeEmail from '../../hooks/auth/useChangeEmail'
import useCurrentUser from '../../hooks/useCurrentUser'
import { ChangeEmailType } from '../../types/ChangeEmailType'

const EnhancedUserChangeEmail: React.FC = () => {
    const user = useCurrentUser()
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/user/setting' }
    }
    const { error, isLoading, mutate: changeEmail } = useChangeEmail()
    const statusCode = error?.response?.status
    const methods = useForm<ChangeEmailType>({ shouldUnregister: false, })
    const onSubmit = async (data: ChangeEmailType): Promise<void> => {
        const { address } = data
        if (
            address === ""
        ) {
            return
        }
        const formData = new FormData()
        formData.append("address", address)
        changeEmail(formData, {
            onSuccess: () => {
                history.replace(from)
            }
        })

    }
    return (
        <FormProvider {...methods}>
            <UserChangeEmail
                user={user}
                onSubmit={onSubmit}
                isLoading={isLoading}
                statusCode={statusCode}
                error={error}
            />
        </FormProvider>
    )
}
export default EnhancedUserChangeEmail
