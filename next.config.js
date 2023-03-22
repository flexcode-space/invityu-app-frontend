const nextConfig = {
	reactStrictMode: true,
	experimental: {
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
	env: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	},
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"via.placeholder.com",
			"api-dev.invityu.com",
		],
	},
};

module.exports = nextConfig;
