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
    Authorization: Cookies.get('Authorization'),
    'Content-Type': 'application/json',
  },
};