import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface AxiosOptions extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    'Content-Type': string;
  };
}

export const axiosOptions: AxiosOptions = {
  headers: {
    Authorization: Cookies.get('token'),
    'Content-Type': 'application/json',
  },
};

export const axiosOptionsTempToken: AxiosOptions = {
  headers: {
    Authorization: Cookies.get('tokenTemp'),
    'Content-Type': 'application/json',
  },
};