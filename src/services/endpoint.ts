const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiVersion = '/v1/';
const apiUrl = baseUrl + apiVersion

export const endpoint = {
  // APP-STATUS
  appStatus: apiUrl + 'app-status',

  // AUTHENTICATION
  login: apiUrl + 'auth/login',
  register: apiUrl + 'auth/register',
  accountCheck: apiUrl + 'auth/check',
  otpVerify: apiUrl + 'auth/verify',
  newPassword: apiUrl + 'auth/new-password',

  // USER
  registerComplete: apiUrl + 'user/register/complete',

}


