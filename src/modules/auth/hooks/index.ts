import { useMutation } from 'react-query';
import { postAccountCheck, postLogin, postNewPassword, postOtpVerify, postRegister } from '@/services/auth';
import { AuthLoginType, AuthRegisterType, AuthVerifyType } from '@/common/types/auth';

export const usePostRegister = () => {
  return useMutation((payload: AuthRegisterType) => postRegister(payload));
};

export const usePostLogin = () => {
  return useMutation((payload: AuthLoginType) => postLogin(payload));
};

export const usePostAccountCheck = () => {
  return useMutation((payload: AuthRegisterType) => postAccountCheck(payload));
};

export const usePostOtpVerify = () => {
  return useMutation((payload: AuthVerifyType) => postOtpVerify(payload));
};

export const usePostNewPassword = () => {
  return useMutation((payload: AuthLoginType) => postNewPassword(payload));
};

