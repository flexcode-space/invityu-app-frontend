import { toast } from "react-hot-toast";

export const onErrorHandling = (error: unknown) => {
  if (error instanceof Error) {
    if ((error as any).response?.data?.error) {
      toast.error((error as any).response?.data?.error);
    } else {
      toast.error("Unknown error occurred!");
    }
  }
};