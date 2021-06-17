import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { AxiosError } from 'axios';

type Props = {
  type: 'error' | 'info' | 'success' | 'warning';
  title: string;
  onClose?: VoidFunction;
  error: AxiosError<any> | null;
  content: string| null;
};

const GeneralAlert: FC<Props> = ({ type, title, error, onClose, content }) => (
  <>
    {error?.response?.data.errors.name &&
      <Alert severity={type} onClose={onClose} className='m-2' style={{ whiteSpace: 'pre-wrap' }}>
        <AlertTitle>{title}</AlertTitle>
        {error?.response?.data.errors.name}
      </Alert>
    }
    {error?.response?.data.errors.email &&
      <Alert severity={type} onClose={onClose} className='m-2' style={{ whiteSpace: 'pre-wrap' }}>
        <AlertTitle>{title}</AlertTitle>
        {error?.response?.data.errors.email}
      </Alert>
    }
    {content &&
      <Alert severity={type} onClose={onClose} className='m-2' style={{ whiteSpace: 'pre-wrap' }}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    }
  </>
);

export default GeneralAlert;
