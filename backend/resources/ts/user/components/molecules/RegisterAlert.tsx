import React, { FC } from 'react';
import { AxiosError } from 'axios';
import GeneralAlert from '../atoms/GeneralAlert';
import {
  UNKNOWN_STATUS,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} from '../../../constants/statusCode';

type Props = {
  error: AxiosError<any> | null
  statusCode: number;
};

const RegisterAlert: FC<Props> = ({ statusCode, error }) => (
  <>
    {statusCode === UNPROCESSABLE_ENTITY && (
      <GeneralAlert
        type="error"
        title="認証失敗"
        error={error}
        content=""
      />

    )}
    {(statusCode === UNKNOWN_STATUS ||
      statusCode === INTERNAL_SERVER_ERROR) && (
        <GeneralAlert
          type="error"
          title="サーバエラー"
          error={error}
          content={null}
        />
      )}
  </>
);

export default RegisterAlert;
