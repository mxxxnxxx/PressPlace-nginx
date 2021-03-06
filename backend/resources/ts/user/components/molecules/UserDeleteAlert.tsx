import React, { FC } from 'react'
import GeneralAlert from '../atoms/GeneralAlert'
import {
    UNKNOWN_STATUS,
    INTERNAL_SERVER_ERROR,
} from '../../../constants/statusCode'
import { AxiosError } from 'axios'

type Props = {
    statusCode: number
    error: AxiosError<any> | null
}

const UserDeleteAlert: FC<Props> = ({ statusCode, error }) => (
    <>
        {(statusCode === UNKNOWN_STATUS ||
            statusCode === INTERNAL_SERVER_ERROR) && (
                <GeneralAlert
                    type="error"
                    title="サーバエラー"
                    content={`予期しないエラーが発生し、アカウント削除に失敗しました。\n恐れ入りますが時間をおいて再度お試しください。`}
                    error={error}
                />
            )}
    </>
)

export default UserDeleteAlert
