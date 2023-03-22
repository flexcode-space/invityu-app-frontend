import { useEffect } from "react";
import { useRouter } from "next/router";

import { protectedRoute } from "@/common/utils/auth";

const CreatePage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/create/themes");
	}, []);

	return;
};

export default protectedRoute(CreatePage);
