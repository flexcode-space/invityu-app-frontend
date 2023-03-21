export interface AxiosErrorProps {
  response?: {
    data?: {
      error?: string;
      status?: boolean;
    },
    status?: number
  };
}