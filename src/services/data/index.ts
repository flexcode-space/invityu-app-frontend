import axios from 'axios';
import { endpoint } from '../endpoint';
import {
  BrideDataProps,
  EventDataProps,
  FilterDataBySectionProps,
} from '@/common/types/information';
import { axiosOptions } from '../config';

export const getInvitationData = () => {
  return axios.get(endpoint.allData, axiosOptions());
};

export const getInvitationDataBySection = (params: FilterDataBySectionProps) => {
  const headers = axiosOptions().headers;
  const options = {
    headers,
    params,
  };
  return axios.get(endpoint.dataBySection, options);
};

export const postBridesData = (type: string, payload: BrideDataProps) => {
  return axios.post(`${endpoint.bridesData}/${type}`, payload, axiosOptions());
};

export const getEventsData = () => {
  return axios.get(endpoint.eventsData, axiosOptions());
};

export const postEventsData = (payload: EventDataProps) => {
  return axios.post(endpoint.eventsData, payload, axiosOptions());
};

export const putEventData = (payload: EventDataProps) => {
  return axios.put(endpoint.eventsData, payload, axiosOptions());
};

export const deleteEventData = (payload: { id: string | null | undefined }) => {
  return axios.delete(`${endpoint.eventsData}/${payload?.id}`, axiosOptions());
};
