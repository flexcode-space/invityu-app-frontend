import { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";

import Layout from "@/common/components/layouts/Layout";
import ReactHotToast from "@/common/components/elements/ReactHotToast";
import type { AppProps } from "next/app";

import { jakartaSans, poppins } from "@/common/styles/fonts";

import "aos/dist/aos.css";
import "@/common/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 10 * 1000,
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});

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
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={pageProps.session}>
					<Layout>
						<ReactHotToast />
						<Component {...pageProps} />
					</Layout>
				</SessionProvider>
			</QueryClientProvider>
		</>
	);
}
