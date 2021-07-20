import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../layout/components/organisms/Header';
import { useLogout } from '../../../user/hooks/auth';
import { useCurrentUser } from '../../../user/hooks';


const EnhancedHeader: FC = () => {
  const user = useCurrentUser();

  const history = useHistory();
  const { mutate } = useLogout();

  const handleLogout = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        history.push('/login');
      },
    });
  }, [history, mutate]);

  return <Header userName={user?.name} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
