
import axios from 'axios';
import Cookies from 'js-cookie';
import { endpoint } from '../endpoint';
import { AuthLoginProps, AuthLoginSSOProps, AuthNewPasswordProps, AuthRegisterProps, AuthVerifyProps } from '@/common/types/auth';
import { AxiosOptionsProps } from '@/common/types/axios';

const axiosOptions: AxiosOptionsProps = {
  headers: {
    Authorization: Cookies.get('token'),
    'Content-Type': 'application/json',
  },
};

const axiosOptionsTempToken: AxiosOptionsProps = {
  headers: {
    Authorization: Cookies.get('tokenTemp'),
    'Content-Type': 'application/json',
  },
};

export const postRegister = (payload: AuthRegisterProps) =>
  axios.post(endpoint.register, payload, axiosOptions);

export const postLogin = (payload: AuthLoginProps) =>
  axios.post(endpoint.login, payload, axiosOptions);

export const postLoginSSO = (payload: AuthLoginSSOProps) =>
  axios.post(endpoint.loginSSO, payload, axiosOptions);

export const postAccountCheck = (payload: AuthRegisterProps) =>
  axios.post(endpoint.accountCheck, payload, axiosOptions);

export const postOtpVerify = (payload: AuthVerifyProps) =>
  axios.post(endpoint.otpVerify, payload, axiosOptions);

export const postOtpResend = (payload: AuthRegisterProps) =>
  axios.post(endpoint.otpResend, payload, axiosOptions);

export const postNewPassword = (payload: AuthNewPasswordProps) =>
  axios.post(endpoint.newPassword, payload, axiosOptionsTempToken);

