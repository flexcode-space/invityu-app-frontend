import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Register from "@/modules/auth/components/Register";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const RegisterPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Daftar - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.AUTH}
			/>
			<Register />
		</>
	);
};

export default RegisterPage;
