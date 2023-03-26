import { NextPage } from "next";
import { NextSeo } from "next-seo";

import NewPassword from "@/modules/auth/components/NewPassword";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const NewPasswordPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Buat Kata Sandi - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.AUTH}
			/>
			<NewPassword />
		</>
	);
};

export default NewPasswordPage;
