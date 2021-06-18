import React, { FC } from 'react';
import { AxiosError } from 'axios';
import {
  UNKNOWN_STATUS,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} from '../../../constants/statusCode';
import { Alert, AlertTitle} from '@material-ui/lab';
type Props = {
  error: AxiosError<any> | null
  statusCode: number;
};

const RegisterAlert: FC<Props> = ({ statusCode, error }) => (
  <>
    {error?.response?.data.errors.email && (
      <Alert severity="error" className='m-2'>
        <AlertTitle>認証エラー</AlertTitle>
        {error.response.data.errors.email}
      </Alert>
    )}

    {error?.response?.data.errors.name && (
      <Alert severity="error" className='m-2'>
        <AlertTitle>認証エラー</AlertTitle>
        {error.response.data.errors.name}
      </Alert>
    )}

    {(statusCode === UNKNOWN_STATUS ||
      statusCode === INTERNAL_SERVER_ERROR) && (
      <Alert severity="error" className='m-2'>
        <AlertTitle>サーバーエラー</AlertTitle>
        "予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。"
      </Alert>
      )}
  </>
);

export default RegisterAlert;
