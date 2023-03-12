export interface SSOLoginProps {
  callback: (session: any) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SSOProviderProps = {
  id: string;
  icon?: string;
  textColor?: string;
  borderColo?: string;
  backgroundColor?: string;
  is_active: boolean;
  config: any[];
};

export type SSOCallbackResponseProps = {
  expires: string;
  user: {
    email: string;
    image?: string;
    name?: string;
  };
};