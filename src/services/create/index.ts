
import axios from 'axios';
import Cookies from 'js-cookie';
import { endpoint } from '../endpoint';
import { ThemeListParamsProps, ThemeSelectProps } from '@/common/types/themes';
import { AxiosOptionsProps } from '@/common/types/axios';

const axiosOptions: AxiosOptionsProps = {
  headers: {
    Authorization: Cookies.get('token'),
    'Content-Type': 'application/json',
  },
};

export const getThemeList = (params: ThemeListParamsProps) => {
  const options = {
    axiosOptions,
    params
  }
  return axios.get(endpoint.themeList, options);
}

export const getThemeById = (theme_id: string) => {
  return axios.get(`${endpoint.themeById}/${theme_id}`, axiosOptions);
}

export const postThemeSelect = (payload: ThemeSelectProps) =>
  axios.post(endpoint.themeSelect, payload, axiosOptions);

