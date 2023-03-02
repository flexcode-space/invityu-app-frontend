import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "@/components/layouts/Layout";
import ReactHotToast from "@/components/shared/ReactHotToast";

import { jakartaSans, poppins } from "@/styles/fonts";

import "@/styles/globals.css";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
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
			<Layout>
				<ReactHotToast />
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
