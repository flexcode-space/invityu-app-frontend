import { NextPage } from "next";
import { NextSeo } from "next-seo";

import InvitationView from "@/modules/invitation/components/InvitationView";

const Invitation: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Invityu"
				description="Invityu Invitation Page"
				themeColor="#ebf2fc"
			/>
			<InvitationView />
		</>
	);
};

export default Invitation;
