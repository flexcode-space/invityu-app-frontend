import { useMutation, useQuery } from 'react-query';
import {
  BrideDataProps,
  EventDataProps,
  FilterDataBySectionProps,
} from '@/common/types/information';
import {
  getEventsData,
  getInvitationData,
  getInvitationDataBySection,
  postBridesData,
  postEventsData,
} from '@/services/data';

export const useGetInvitationData = () => {
  return useQuery(['invitation-data'], () => getInvitationData());
};

export const useGetInvitationDataBySection = (params: FilterDataBySectionProps) => {
  return useQuery(['invitation-data', params], () => getInvitationDataBySection(params));
};

export const usePostBridesData = (type: string) => {
  return useMutation((payload: BrideDataProps) => postBridesData(type, payload));
};

export const useGetEventsData = () => {
  return useQuery(['events-data'], () => getEventsData());
};

export const usePostEventsData = () => {
  return useMutation((payload: EventDataProps) => postEventsData(payload));
};
