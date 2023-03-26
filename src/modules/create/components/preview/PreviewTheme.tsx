import React from "react";

import PageHeader from "@/common/components/layouts/partials/PageHeader";
import FixedFloatingBottom from "@/common/components/elements/FixedFloatingBottom";
import EmbeddedWebsite from "@/common/components/elements/EmbeddedWebsite";

import { url } from "@/common/constant/url";
import Button from "@/common/components/elements/Button";
import { formatCurrency } from "@/common/helpers";

const PreviewTheme: React.FC = () => {
	const invitationPreviewUrl = "https://invityu-client.vercel.app";

	const price = 199000;
	const initial_price = 399000;

	return (
		<>
			<PageHeader
				title={`Preview Tema`}
				backUrl={url?.THEMES_LIST_URL}
				isFixedPosition
				isBackButton
			/>
			<div className="pt-[60px] scrollbar-hide">
				<EmbeddedWebsite url={invitationPreviewUrl} />
			</div>
			<FixedFloatingBottom
				isShadow
				className="flex p-5 w-full items-center justify-between gap-5"
			>
				<div className="w-3/5 flex flex-col gap-1">
					<div className=" text-primary font-semibold">Paket Ekslusif</div>
					<div className=" flex items-center gap-2">
						<p className="text-gray-600 font-medium">{formatCurrency(price)}</p>
						{initial_price && (
							<p className="text-gray-400 text-sm line-through">
								{formatCurrency(initial_price)}
							</p>
						)}
					</div>
				</div>
				<div className="w-2/5">
					<Button isBlock>Pilih Tema</Button>
				</div>
			</FixedFloatingBottom>
		</>
	);
};

export default PreviewTheme;
