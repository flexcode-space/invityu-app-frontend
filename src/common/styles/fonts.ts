import { Fira_Code, Poppins, Plus_Jakarta_Sans, } from "next/font/google";
import localFont from 'next/font/local';

export const poppins = Poppins({
  variable: "--poppins-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const jakartaSans = Plus_Jakarta_Sans({
  variable: "--jakartaSans-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800"],
});

export const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
})

export const gilroy = localFont({
  src: [
    {
      path: '../../../public/fonts/gilroy/Gilroy-Thin.woff2',
      weight: '100',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-UltraLight.woff2',
      weight: '200',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Light.woff2',
      weight: '300',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Semibold.woff2',
      weight: '600',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/gilroy/Gilroy-Extrabold.woff2',
      weight: '800',
    },
  ],
  variable: "--gilroy-font",
});

export const modernist = localFont({
  src: [
    {
      path: '../../../public/fonts/sk-modernist/Sk-Modernist-Light.woff2',
      weight: '300',
    },
    {
      path: '../../../public/fonts/sk-modernist/Sk-Modernist-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/sk-modernist/Sk-Modernist-Bold.woff2',
      weight: '700',
    },
  ],
  variable: "--modernist-font",
});
