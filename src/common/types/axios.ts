import { AxiosRequestConfig } from "axios";

export interface AxiosOptionsProps extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    'Content-Type': string;
  };
}