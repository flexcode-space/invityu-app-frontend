import { ssoProviders } from "@/constant/ssoProviders"
import NextAuth from "next-auth"

type SSOProviderProps = {
  id: string;
  icon?: string;
  textColor?: string;
  borderColo?: string;
  backgroundColor?: string;
  is_active: boolean;
  config: any[];
};

const getProviderConfigs = (providers: SSOProviderProps[]): any[] => {
  return providers.filter(provider => provider.is_active).flatMap(provider => provider.config);
}

export const authOptions = {
  providers: getProviderConfigs(ssoProviders),
  secret: process.env.JWT_SECRET as string,
}

export default NextAuth(authOptions)