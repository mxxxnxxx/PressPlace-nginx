import imageCompression from 'browser-image-compression'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from "react-router-dom"
import UserEdit from "../../components/pages/UserEdit"
import { useCurrentUser, useGetUserQuery } from '../../hooks'
import useEditUserProfile from '../../hooks/useEditUserProfileMutation'
import { UserEditData } from "../../types/UserEditData"

const EnhancedUserEdit: React.FC = () => {
    const queryClient = useQueryClient()
    const currentUser = useCurrentUser()
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/mypage/myPlace' },
    }
    const [userImage, setUserImage] = useState<File[]>()
    const [oldUserImage, setOldUserImage] = useState<string>()

    // ここでoldデータの取得を行う
    useEffect(
        () => {
            // コールバックのasync,
            (async (): Promise<void> => {
                currentUser && setOldUserImage(() => currentUser?.userImage)
            })();
        }, [currentUser])

    // ここにmutation
    const { isLoading, mutate: editPostPlace } = useEditUserProfile()


    const methods = useForm<UserEditData>({ shouldUnregister: false })
    const onSubmit = async (data: UserEditData): Promise<void> => {
        if (currentUser) {
            const userId = currentUser.id
            const { name, introduction } = data

            const formData = new FormData()
            formData.append("_method", 'PATCH')

            name && formData.append("name", name)
            introduction && formData.append("introduction", introduction)

            if (userImage) {
                const compressOptions = {
                    // 3MB以下に圧縮する
                    maxSizeMB: 3,
                }
                // ここが関数になってしまっている
                const compressedUserImage = await imageCompression(userImage[0], compressOptions)
                formData.append("user_image", compressedUserImage)
            }
            if (oldUserImage) {
                formData.append("old_user_image", oldUserImage)
            }

            editPostPlace({ formData, userId },
                {
                    onSuccess: async () => {
                        await queryClient.refetchQueries(['user'], { exact: true })
                        await queryClient.refetchQueries(['userProfile'], { exact: true })
                        history.replace(from)
                    }
                }
            )
        }
    }
    return (
        <FormProvider {...methods}>
            <UserEdit
                onSubmit={onSubmit}
                userImage={userImage}
                setUserImage={setUserImage}
                oldUserImage={oldUserImage}
                setOldUserImage={setOldUserImage}
                isLoading={isLoading}
            />
        </FormProvider>
    )
}


export default EnhancedUserEdit
