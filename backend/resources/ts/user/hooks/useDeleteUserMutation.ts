import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import useCurrentUser from './useCurrentUser';


const deleteUser = async (): Promise<void> => {

  // ここで指定する必要がある

  await axios.get('/places/delete/{id}');
};

const useDeleteUserMutation = (): UseMutationResult<
  void,
  AxiosError,
  void,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey !== 'user',
      });
      queryClient.resetQueries('user');
    },
  });
};

export default useDeleteUserMutation;
