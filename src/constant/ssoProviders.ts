import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple";

export const ssoProviders = [
  {
    id: "google",
    icon: "/images/icons/ic-google.svg",
    textColor: "#252525",
    borderColor: "var(--bg-primary-100)",
    backgroundColor: "#fff",
    is_active: true,
    config: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ]
  },
  {
    id: "apple",
    icon: "/images/icons/ic-google.svg",
    textColor: "#ffffff",
    borderColor: "#000000",
    backgroundColor: "#000000",
    is_active: false,
    config: [
      AppleProvider({
        clientId: process.env.APPLE_ID as string,
        clientSecret: process.env.APPLE_SECRET as string,
      })
    ]
  },
];