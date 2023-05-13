import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface AxiosOptions extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    'Content-Type': string;
  };
}

const defaultContentType = 'application/json';

const createAxiosOptions = (token: string | undefined): AxiosOptions => {
  const headers = {
    Authorization: token,
    'Content-Type': defaultContentType,
  };

  return { headers };
};

export const axiosOptions = (): AxiosOptions => {
  const token = Cookies.get('token');
  return createAxiosOptions(token);
};

export const axiosOptionsTempToken = (): AxiosOptions => {
  const tokenTemp = Cookies.get('tokenTemp');
  return createAxiosOptions(tokenTemp);
};
