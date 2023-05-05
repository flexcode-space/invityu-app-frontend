import { useMutation, useQuery } from 'react-query';
import { BrideDataProps, FilterDataBySectionProps } from '@/common/types/information';
import { getInvitationData, getInvitationDataBySection, postBridesData } from '@/services/data';

export const useGetInvitationData = () => {
  return useQuery(['invitation-data'], () => getInvitationData());
};

export const useGetInvitationDataBySection = (params: FilterDataBySectionProps) => {
  return useQuery(['invitation-data', params], () => getInvitationDataBySection(params));
};

export const usePostBridesData = (type: string) => {
  return useMutation((payload: BrideDataProps) => postBridesData(type, payload));
};
