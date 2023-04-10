
import axios from 'axios';
import Cookies from 'js-cookie';
import { endpoint } from '../endpoint';
import { ThemeSelectProps } from '@/common/types/themes';
import { AxiosOptionsProps } from '@/common/types/axios';

const axiosOptions: AxiosOptionsProps = {
  headers: {
    Authorization: Cookies.get('token'),
    'Content-Type': 'application/json',
  },
};

export const getThemeList = () =>
  axios.get(endpoint.themeList, axiosOptions);

export const postThemeSelect = (payload: ThemeSelectProps) =>
  axios.post(endpoint.themeSelect, payload, axiosOptions);

