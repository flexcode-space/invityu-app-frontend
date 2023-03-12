import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Login from "@/modules/auth/components/Login";

const LoginPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Masuk - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<Login />
		</>
	);
};

export default LoginPage;
