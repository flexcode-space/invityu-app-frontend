import { useMutation, useQuery } from 'react-query';
import { getThemeById, getThemeList, postThemeSelect } from '@/services/create';
import { ThemeListParamsProps, ThemeSelectProps } from '@/common/types/themes';

export const useGetThemeList = (params: ThemeListParamsProps) => {
  return useQuery(["theme-list", params], () => getThemeList(params));
};

export const useGetThemeById = (theme_id: string) => {
  return useQuery(["theme-by-id", theme_id], () => getThemeById(theme_id));
};

export const usePostThemeSelect = () => {
  return useMutation((payload: ThemeSelectProps) => postThemeSelect(payload));
};
