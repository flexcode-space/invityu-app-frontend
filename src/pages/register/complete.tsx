import { NextPage } from "next";
import { NextSeo } from "next-seo";

import RegisterComplete from "@/modules/user/components/RegisterComplete";

const RegisterCompletePage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Buat Kata Sandi - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<RegisterComplete />
		</>
	);
};

export default RegisterCompletePage;
