import { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";

import Layout from "@/components/layouts/Layout";
import ReactHotToast from "@/components/shared/ReactHotToast";

import { jakartaSans, poppins } from "@/styles/fonts";

import "aos/dist/aos.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			delay: 100,
		});
	}, []);

	return (
		<>
			<style jsx global>
				{`
					html {
						--poppins-font: ${poppins.style.fontFamily};
						--jakartaSans-font: ${jakartaSans.style.fontFamily};
					}
				`}
			</style>
			<Head>
				<title>Invityu</title>
				<meta name="description" content="Buat Undangan Digital Invityu" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				/>
				<meta name="theme-color" content="#ffffff" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SessionProvider session={pageProps.session}>
				<Layout>
					<ReactHotToast />
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</>
	);
}
