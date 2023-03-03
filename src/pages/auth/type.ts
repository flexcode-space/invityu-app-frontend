export type SSOCallbackResponseProps = {
  expires: string;
  user: {
    email: string;
    image?: string;
    name?: string;
  };
};