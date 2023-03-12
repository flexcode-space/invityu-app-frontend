import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Welcome from "@/modules/welcome/components/Welcome";

const Home: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Selamat Datang di Invityu - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#ebf2fc"
			/>
			<Welcome />
		</>
	);
};

export default Home;
