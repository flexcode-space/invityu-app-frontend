import { useMutation } from 'react-query';
import { postRegisterComplete } from '@/services/user';
import { AuthRegisterCompleteProps } from '@/common/types/auth';

export const usePostRegisterComplete = () => {
  return useMutation((payload: AuthRegisterCompleteProps) => postRegisterComplete(payload));
};

