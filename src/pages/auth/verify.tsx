import { NextPage } from "next";
import { NextSeo } from "next-seo";

import VerifyOTP from "@/modules/auth/components/VerifyOTP";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const VerifyPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Verifikasi - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.AUTH}
			/>
			<VerifyOTP />
		</>
	);
};

export default VerifyPage;
