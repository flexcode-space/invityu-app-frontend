import { useMutation } from 'react-query';
import { postRegisterComplete } from '@/services/user';
import { AuthRegisterCompleteType } from '@/common/types/auth';

export const usePostRegisterComplete = () => {
  return useMutation((payload: AuthRegisterCompleteType) => postRegisterComplete(payload));
};

