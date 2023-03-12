
import axios from 'axios';
import { axiosOptions } from '../config';
import { endpoint } from '../endpoint';
import { AuthRegisterCompleteType } from '@/common/types/auth';

export const postRegisterComplete = (payload: AuthRegisterCompleteType) =>
  axios.post(endpoint.registerComplete, payload, axiosOptions);