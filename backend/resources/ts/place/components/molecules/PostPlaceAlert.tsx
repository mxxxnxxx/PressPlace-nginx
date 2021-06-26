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

const PostPlaceAlert: FC<Props> = ({ statusCode, error }) => (
  <>
    {(statusCode === UNKNOWN_STATUS ||
      statusCode === INTERNAL_SERVER_ERROR) && (
      <Alert severity="error" className='m-2'>
        <AlertTitle>サーバーエラー</AlertTitle>
        "予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。"
      </Alert>
      )}
  </>
);

export default PostPlaceAlert;
