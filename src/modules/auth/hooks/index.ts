import { useMutation } from 'react-query';
import { postAccountCheck, postLogin, postLoginSSO, postNewPassword, postOtpResend, postOtpVerify, postRegister } from '@/services/auth';
import { AuthLoginProps, AuthLoginSSOProps, AuthNewPasswordProps, AuthRegisterProps, AuthVerifyProps } from '@/common/types/auth';

export const usePostRegister = () => {
  return useMutation((payload: AuthRegisterProps) => postRegister(payload));
};

export const usePostLogin = () => {
  return useMutation((payload: AuthLoginProps) => postLogin(payload));
};

export const usePostLoginSSO = () => {
  return useMutation((payload: AuthLoginSSOProps) => postLoginSSO(payload));
};

export const usePostAccountCheck = () => {
  return useMutation((payload: AuthRegisterProps) => postAccountCheck(payload));
};

export const usePostOtpVerify = () => {
  return useMutation((payload: AuthVerifyProps) => postOtpVerify(payload));
};

export const usePostOtpResend = () => {
  return useMutation((payload: AuthRegisterProps) => postOtpResend(payload));
};

export const usePostNewPassword = () => {
  return useMutation((payload: AuthNewPasswordProps) => postNewPassword(payload));
};

