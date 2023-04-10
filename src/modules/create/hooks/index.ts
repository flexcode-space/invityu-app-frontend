import { useMutation, useQuery } from 'react-query';
import { getThemeList, postThemeSelect } from '@/services/create';
import { ThemeSelectProps } from '@/common/types/themes';

export const useGetThemeList = () => {
  return useQuery(["theme-list"], () => getThemeList());

};

export const usePostThemeSelect = () => {
  return useMutation((payload: ThemeSelectProps) => postThemeSelect(payload));
};
