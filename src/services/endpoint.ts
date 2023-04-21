const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiVersion = '/v1/';
const apiUrl = baseUrl + apiVersion

export const endpoint = {
  // APP-STATUS
  appStatus: apiUrl + 'app-status',

  // AUTHENTICATION
  login: apiUrl + 'auth/login',
  loginSSO: apiUrl + 'auth/sso',
  register: apiUrl + 'auth/register',
  accountCheck: apiUrl + 'auth/check',
  otpVerify: apiUrl + 'auth/verify',
  otpResend: apiUrl + 'auth/otp/resend',
  newPassword: apiUrl + 'auth/new-password',

  // USER
  registerComplete: apiUrl + 'user/register/complete',

  // CREATE
  themeCategory: apiUrl + 'event/themes/category-master',
  themeList: apiUrl + 'event/themes',
  themeById: apiUrl + 'event/theme',
  themeSelect: apiUrl + 'event/create'

}


