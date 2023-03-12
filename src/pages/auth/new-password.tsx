import { NextPage } from "next";
import { NextSeo } from "next-seo";

import NewPassword from "@/modules/auth/components/NewPassword";

const NewPasswordPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Buat Kata Sandi - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<NewPassword />
		</>
	);
};

export default NewPasswordPage;
