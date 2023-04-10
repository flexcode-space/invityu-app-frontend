import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { protectedRoute } from "@/common/utils/auth";
import QueryTheme from "@/modules/create/components/themes/QueryTheme";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const CreateQueryThemePage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Pilih Tema - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.PRIMARY}
			/>
			<QueryTheme />
		</>
	);
};

export default protectedRoute(CreateQueryThemePage);
