import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Login from "@/modules/auth/components/Login";

import { themeColor } from "@/common/constant/color";
import { meta } from "@/common/constant/meta";

const LoginPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Masuk - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.AUTH}
			/>
			<Login />
		</>
	);
};

export default LoginPage;
