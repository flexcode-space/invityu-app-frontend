import { useMutation } from 'react-query';
import { postAccountCheck, postLogin, postNewPassword, postOtpVerify, postRegister } from '@/services/auth';
import { AuthLoginProps, AuthRegisterProps, AuthVerifyProps } from '@/common/types/auth';

export const usePostRegister = () => {
  return useMutation((payload: AuthRegisterProps) => postRegister(payload));
};

export const usePostLogin = () => {
  return useMutation((payload: AuthLoginProps) => postLogin(payload));
};

export const usePostAccountCheck = () => {
  return useMutation((payload: AuthRegisterProps) => postAccountCheck(payload));
};

export const usePostOtpVerify = () => {
  return useMutation((payload: AuthVerifyProps) => postOtpVerify(payload));
};

export const usePostNewPassword = () => {
  return useMutation((payload: AuthLoginProps) => postNewPassword(payload));
};

