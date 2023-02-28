import { Poppins } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--poppins-font",
});

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--jakartaSans-font",
});