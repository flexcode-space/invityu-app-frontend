import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

import PageHeader from "@/common/components/layouts/partials/PageHeader";
import FixedFloatingBottom from "@/common/components/elements/FixedFloatingBottom";
import EmbeddedWebsite from "@/common/components/elements/EmbeddedWebsite";

import Button from "@/common/components/elements/Button";
import { toast } from "react-hot-toast";
import { formatCurrency } from "@/common/helpers";
import { url } from "@/common/constant/url";
import { onErrorHandling } from "@/common/helpers/error";

import { usePostThemeSelect } from "../../hooks";

const PreviewTheme: React.FC = () => {
	// TODO: fetch single theme api to get theme data here
	const invitationPreviewUrl = "https://invityu-client.vercel.app";
	const price = 199000;
	const initial_price = 399000;

	const router = useRouter();
	const { id, pid } = router.query;

	const { mutate, isLoading } = usePostThemeSelect();

	const handleSelectTheme = () => {
		const payload = {
			package_id: pid as string,
			theme_id: id as string,
		};

		try {
			mutate(payload, {
				onSuccess: (res) => {
					if (res?.data?.status) {
						Router.push("/create/information");
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
	};

	useEffect(() => {
		if (id == undefined || pid == undefined) Router.push("/create/themes");
	}, [id, pid]);

	return (
		<>
			<PageHeader
				title={`Preview Tema`}
				backUrl={url?.THEMES_LIST_URL}
				isFixedPosition
				isBackButton
			/>
			<div className="pt-[60px] pb-24 scrollbar-hide">
				<EmbeddedWebsite url={invitationPreviewUrl} />
			</div>
			<FixedFloatingBottom
				isShadow
				className="flex p-5 w-full items-center justify-between gap-5"
			>
				<div className="w-3/5 flex flex-col gap-1">
					<div className="text-primary font-semibold">Glitterbloom</div>
					<div className="flex items-center gap-2">
						<p className="text-gray-600 font-medium">{formatCurrency(price)}</p>
						{initial_price && (
							<p className="text-gray-400 text-sm line-through">
								{formatCurrency(initial_price)}
							</p>
						)}
					</div>
				</div>
				<div className="w-2/5">
					<Button onClick={handleSelectTheme} isLoading={isLoading} isBlock>
						Pilih Tema
					</Button>
				</div>
			</FixedFloatingBottom>
		</>
	);
};

export default PreviewTheme;
