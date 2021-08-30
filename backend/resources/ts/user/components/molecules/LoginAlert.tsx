import React, { FC } from 'react'
import GeneralAlert from '../atoms/GeneralAlert'
import {
    UNKNOWN_STATUS,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR,
} from '../../../constants/statusCode'
import { AxiosError } from 'axios'

type Props = {
    statusCode: number
    error: AxiosError<any> | null
}

const LoginAlert: FC<Props> = ({ statusCode, error }) => (
    <>
        {statusCode === UNPROCESSABLE_ENTITY && (
            <GeneralAlert
                type="error"
                title="認証失敗"
                content="入力した情報に誤りがないかご確認ください。"
                error={error}
            />
        )}
        {(statusCode === UNKNOWN_STATUS ||
            statusCode === INTERNAL_SERVER_ERROR) && (
                <GeneralAlert
                    type="error"
                    title="サーバエラー"
                    content="予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。"
                    error={error}
                />
            )}
    </>
)

export default LoginAlert
