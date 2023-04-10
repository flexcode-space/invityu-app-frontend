
import axios from 'axios';
import Cookies from 'js-cookie';
import { endpoint } from '../endpoint';
import { AuthRegisterCompleteProps } from '@/common/types/auth';
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

export const postRegisterComplete = (payload: AuthRegisterCompleteProps) =>
  axios.post(endpoint.registerComplete, payload, axiosOptionsTempToken);