import Router from "next/router";
import { toast } from "react-hot-toast";
import { logout } from "../utils/auth";

export const onErrorHandling = (error: unknown) => {
  if (error instanceof Error) {
    if ((error as any).response?.data?.error) {
      if ((error as any).response?.data?.error?.includes('token is expired')) {
        toast.error('Sesi kamu sudah berakhir');
        logout();
        Router.push('/auth/login')
      } else {
        toast.error((error as any).response?.data?.error);
      }
    } else {
      toast.error("Unknown error occurred!");
    }
  }
};