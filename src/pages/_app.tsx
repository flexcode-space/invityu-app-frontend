import type { AppProps } from "next/app";

import Layout from "@/components/layouts/Layout";

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
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
