export type AuthRegisterType = {
  username: string,
  type: string,
}

export type AuthLoginType = AuthRegisterType & {
  password: string
};

export type AuthVerifyType = AuthRegisterType & {
  otp: string,
  source: string
};

export type AuthRegisterCompleteType = AuthLoginType & {
  name: string
};
