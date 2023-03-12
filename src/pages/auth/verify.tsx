import { NextPage } from "next";
import { NextSeo } from "next-seo";

import VerifyOTP from "@/modules/auth/components/VerifyOTP";

const VerifyPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Verifikasi - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<VerifyOTP />
		</>
	);
};

export default VerifyPage;
