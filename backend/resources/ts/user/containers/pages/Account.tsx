import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Account from '../../../user/components/pages/Account';
import { useDeleteUserMutation } from '../../hooks';

const EnhancedAccount: FC = () => {
  const history = useHistory();

  const { error, isLoading, mutate: deleteUser } = useDeleteUserMutation();
  const statusCode = error?.response?.status;

  const handleDeleteUser = useCallback(() => {
    deleteUser(undefined, {
      onSuccess: () => {
        history.replace('/login');
      },
    });
  }, [history, deleteUser]);

  return (
    <Account
      statusCode={statusCode}
      isLoading={isLoading}
      handleDeleteUser={handleDeleteUser}
      error={error}
    />
  );
};

export default EnhancedAccount;
