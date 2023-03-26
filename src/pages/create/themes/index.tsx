import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { protectedRoute } from "@/common/utils/auth";
import ChooseTheme from "@/modules/create/components/themes/ChooseTheme";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const CreateChooseThemePage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Pilih Tema - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.PRIMARY}
			/>
			<ChooseTheme />
		</>
	);
};

export default protectedRoute(CreateChooseThemePage);
