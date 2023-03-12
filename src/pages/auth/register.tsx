import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Register from "@/modules/auth/components/Register";

const RegisterPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Daftar - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#fafafc"
			/>
			<Register />
		</>
	);
};

export default RegisterPage;
