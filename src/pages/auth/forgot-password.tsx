import { NextPage } from "next";
import { NextSeo } from "next-seo";

import ForgotPassword from "@/modules/auth/components/ForgotPassword";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const ForgotPasswordPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Reset Password - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.AUTH}
			/>
			<ForgotPassword />
		</>
	);
};

export default ForgotPasswordPage;
