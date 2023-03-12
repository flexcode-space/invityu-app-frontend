
import axios from 'axios';
import { axiosOptions } from '../config';
import { endpoint } from '../endpoint';
import { AuthLoginProps, AuthRegisterProps, AuthVerifyProps } from '@/common/types/auth';

export const postRegister = (payload: AuthRegisterProps) =>
  axios.post(endpoint.register, payload, axiosOptions);

export const postLogin = (payload: AuthLoginProps) =>
  axios.post(endpoint.login, payload, axiosOptions);

export const postAccountCheck = (payload: AuthRegisterProps) =>
  axios.post(endpoint.accountCheck, payload, axiosOptions);

export const postOtpVerify = (payload: AuthVerifyProps) =>
  axios.post(endpoint.otpVerify, payload, axiosOptions);

export const postNewPassword = (payload: AuthLoginProps) =>
  axios.post(endpoint.newPassword, payload, axiosOptions);

