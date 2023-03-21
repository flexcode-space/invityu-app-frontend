import React, { useEffect, useState } from "react";
import {
	signIn,
	getProviders,
	useSession,
	LiteralUnion,
	ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

import ButtonIcon from "../../../common/components/elements/ButtonIcon";
import { ssoProviders } from "@/common/constant/ssoProviders";
import { SSOLoginProps } from "@/common/types/auth";
import { usePostLoginSSO } from "../hooks";
import { login } from "@/common/utils/auth";
import { onErrorHandling } from "@/common/helpers/error";
import { toast } from "react-hot-toast";

const SSOLogin: React.FC<SSOLoginProps> = ({ setIsLoading }) => {
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>();

	const { data: session, status } = useSession();
	const { mutate } = usePostLoginSSO();

	console.log("🚀 ~ file: SSOLogin.tsx:12 ~ session:", session);
	console.log("🚀 ~ file: SSOLogin.tsx:12 ~ status:", status);

	if (session) {
		// callback(session);
		setIsLoading(true);

		const payload = {
			email: session?.user?.email,
		};

		try {
			mutate(payload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.status) {
						const token = res?.data?.data || {};
						login({ token });
						setIsLoading(false);
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
		console.log("aulianza here gann SSOLogin");
	}

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

		if (!providers) {
			fetchProviders();
		}
	}, [providers]);

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
								onClick={() => {
									handleLogin(provider.id);
								}}
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
