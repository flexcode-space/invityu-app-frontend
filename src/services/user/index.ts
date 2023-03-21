
import axios from 'axios';
import { axiosOptionsTempToken } from '../config';
import { endpoint } from '../endpoint';
import { AuthRegisterCompleteProps } from '@/common/types/auth';

export const postRegisterComplete = (payload: AuthRegisterCompleteProps) =>
  axios.post(endpoint.registerComplete, payload, axiosOptionsTempToken);