import React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

import PreviewTheme from "@/modules/create/components/preview/PreviewTheme";

import { meta } from "@/common/constant/meta";
import { themeColor } from "@/common/constant/color";

const ThemePreviewPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Preview Tema - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.PRIMARY}
			/>
			<PreviewTheme />
		</>
	);
};

export default ThemePreviewPage;
