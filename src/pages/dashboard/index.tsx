import React from "react";
import { logout } from "@/utils/auth";
import { useSession } from "next-auth/react";
import { protectedRoute } from "@/utils/auth";
import Image from "@/components/shared/Image";

const DashboardPage = () => {
	const { data: session } = useSession();

	return (
		<div className="flex flex-col justify-center gap-5 p-5">
			Dashboard Page
			<div>
				{session?.user?.image && (
					<Image
						src={session?.user?.image}
						width={100}
						height={100}
						alt="welcome"
						loading="eager"
						priority
					/>
				)}
				<ul className="mt-5">
					<li>email: {session?.user?.email}</li>
					<li>name: {session?.user?.name}</li>
				</ul>
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				onClick={logout}
			>
				Logout
			</button>
		</div>
	);
};

export default protectedRoute(DashboardPage);
