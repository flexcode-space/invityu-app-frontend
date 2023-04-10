import React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

import DataInformation from "@/modules/create/components/information/DataInformation";

import { themeColor } from "@/common/constant/color";
import { meta } from "@/common/constant/meta";
import { protectedRoute } from "@/common/utils/auth";

const CreateInformationPage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Data Informasi - Invityu"
				description={meta?.DESCRIPTION}
				themeColor={themeColor?.PRIMARY}
			/>
			<DataInformation />
		</>
	);
};

export default protectedRoute(CreateInformationPage);
