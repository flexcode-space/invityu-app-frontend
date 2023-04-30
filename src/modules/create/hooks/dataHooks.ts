import { BrideDataProps } from '@/common/types/information';
import { getInvitationData, postBridesData } from '@/services/data';
import { useMutation, useQuery } from 'react-query';

export const useGetInvitationData = () => {
  return useQuery(['invitation-data'], () => getInvitationData());
};

export const usePostBridesData = (type: string) => {
  return useMutation((payload: BrideDataProps) => postBridesData(type, payload));
};
