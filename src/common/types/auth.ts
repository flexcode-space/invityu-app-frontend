import React from "react";

export interface AuthRegisterProps {
  username: string;
  type: string;
  source?: string;
}

export interface AuthLoginProps extends AuthRegisterProps {
  password: string;
}

export interface AuthLoginSSOProps {
  email: string | null | undefined;
}

export interface AuthVerifyProps extends AuthRegisterProps {
  otp: string;
}

export interface AuthNewPasswordProps {
  password: string;
}

export interface AuthRegisterCompleteProps {
  password: string;
  type: string;
  source?: string;
}

export interface SSOLoginProps {
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