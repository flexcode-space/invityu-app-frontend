import NextAuth from "next-auth"
import { ssoProviders } from "@/constant/ssoProviders"
import { SSOProviderProps } from "@/components/auth/type";

const getProviderConfigs = (providers: SSOProviderProps[]): any[] => {
  return providers.filter(provider => provider?.is_active).flatMap(provider => provider?.config);
}

export const authOptions = {
  providers: getProviderConfigs(ssoProviders),
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  }
}

export default NextAuth(authOptions)