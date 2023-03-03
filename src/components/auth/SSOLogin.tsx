import React, { useEffect, useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import ButtonIcon from "../shared/ButtonIcon";

import { ssoProviders } from "@/constant/ssoProviders";

interface SSOLoginProps {
	callback: (session: any) => void;
	isLoading?: boolean;
}

const SSOLogin: React.FC<SSOLoginProps> = ({ callback, isLoading }) => {
	const [providers, setProviders] = useState<any>();

	const { data: session } = useSession();
	session && callback(session);

	const handleLogin = (id: string) => {
		signIn(id);
	};

	useEffect(() => {
		async function fetchProviders() {
			try {
				const providers = await getProviders();
				setProviders(providers);
			} catch (error) {
				console.error("Error fetching providers:", error);
			}
		}
		fetchProviders();
	}, []);

	return (
		<>
			{providers &&
				Object.values(providers).map((provider: any) => {
					const ssoProvider = ssoProviders
						?.filter((p) => p.is_active)
						?.find((p) => p.id === provider.id);
					return (
						<div key={provider.name} style={{ marginBottom: 0 }}>
							<ButtonIcon
								icon={ssoProvider?.icon}
								textColor={ssoProvider?.textColor}
								borderColor={ssoProvider?.borderColor}
								backgroundColor={ssoProvider?.backgroundColor}
								type="button"
								isBlock
								isLoading={isLoading}
								onClick={() => handleLogin(provider.id)}
							>
								Lanjutkan dengan {provider.name}
							</ButtonIcon>
						</div>
					);
				})}
		</>
	);
};

export default SSOLogin;
