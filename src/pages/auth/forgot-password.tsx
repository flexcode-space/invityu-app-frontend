import { NextPage } from "next";
import { NextSeo } from "next-seo";

import ForgotPassword from "@/modules/auth/components/ForgotPassword";

const ForgotPasswordPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Reset Password - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<ForgotPassword />
		</>
	);
};

export default ForgotPasswordPage;
