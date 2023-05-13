import axios from 'axios';
import { endpoint } from '../endpoint';
import { ThemeListParamsProps, ThemeSelectProps } from '@/common/types/themes';
import { axiosOptions } from '../config';

export const getThemeCategory = () => {
  return axios.get(endpoint.themeCategory, axiosOptions());
};

export const getThemeList = (params: ThemeListParamsProps) => {
  const headers = axiosOptions().headers;
  const options = {
    headers,
    params,
  };
  return axios.get(endpoint.themeList, options);
};

export const getThemeById = (theme_id: string) => {
  return axios.get(`${endpoint.themeById}/${theme_id}`, axiosOptions());
};

export const postThemeSelect = (payload: ThemeSelectProps) => {
  return axios.post(endpoint.themeSelect, payload, axiosOptions());
};

export const getCurrentEvent = () => {
  return axios.get(endpoint.currentEvent, axiosOptions());
};

export const getMenuConfig = () => {
  return axios.get(endpoint.menuConfig, axiosOptions());
};

export const postMenuConfig = (payload: any) => {
  return axios.post(endpoint.menuConfig, payload, axiosOptions());
};
