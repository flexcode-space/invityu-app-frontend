import axios from 'axios';
import Cookies from 'js-cookie';
import { endpoint } from '../endpoint';
import { AxiosOptionsProps } from '@/common/types/axios';
import { BrideDataProps, FilterDataBySectionProps } from '@/common/types/information';

const axiosOptions: AxiosOptionsProps = {
  headers: {
    Authorization: Cookies.get('token'),
    'Content-Type': 'application/json',
  },
};

export const getInvitationData = () => {
  return axios.get(endpoint.allData, axiosOptions);
};

export const getInvitationDataBySection = (params: FilterDataBySectionProps) => {
  const options = {
    axiosOptions,
    params,
  };
  return axios.get(endpoint.dataBySection, options);
};

export const postBridesData = (type: string, payload: BrideDataProps) => {
  return axios.post(`${endpoint.bridesData}/${type}`, payload, axiosOptions);
};
