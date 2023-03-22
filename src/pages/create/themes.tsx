import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { protectedRoute } from "@/common/utils/auth";
import ChooseTheme from "@/modules/create/components/themes/ChooseTheme";

const CreateChooseThemePage: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Pilih Tema - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#556DC2"
			/>
			<ChooseTheme />
		</>
	);
};

export default protectedRoute(CreateChooseThemePage);
