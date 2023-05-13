import axios from 'axios';
import { endpoint } from '../endpoint';
import { AuthRegisterCompleteProps } from '@/common/types/auth';
import { axiosOptionsTempToken } from '../config';

export const postRegisterComplete = (payload: AuthRegisterCompleteProps) =>
  axios.post(endpoint.registerComplete, payload, axiosOptionsTempToken());
