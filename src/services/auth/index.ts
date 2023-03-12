
import axios from 'axios';
import { axiosOptions } from '../config';
import { endpoint } from '../endpoint';
import { AuthLoginType, AuthRegisterType, AuthVerifyType } from '@/common/types/auth';

export const postRegister = (payload: AuthRegisterType) =>
  axios.post(endpoint.register, payload, axiosOptions);

export const postLogin = (payload: AuthLoginType) =>
  axios.post(endpoint.login, payload, axiosOptions);

export const postAccountCheck = (payload: AuthRegisterType) =>
  axios.post(endpoint.accountCheck, payload, axiosOptions);

export const postOtpVerify = (payload: AuthVerifyType) =>
  axios.post(endpoint.otpVerify, payload, axiosOptions);

export const postNewPassword = (payload: AuthLoginType) =>
  axios.post(endpoint.newPassword, payload, axiosOptions);

