import React from "react";
import { Alert, Tooltip } from "antd";
import { FcInfo as InfoIcon } from "react-icons/fc";

import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import CreateStepWizard from "../CreateStepWizard";

import { url } from "@/common/constant/url";

const DataInformation: React.FC = () => {
	const informationTooltipMessage = "halo bro";

	return (
		<>
			<PageHeader
				title={`Data Informasi`}
				backUrl={url?.THEMES_LIST_URL}
				isFixedPosition
				isBackButton
			/>
			<div className="pt-24 pb-14">
				<CreateStepWizard activeStep={1} />
				<Container className="pb-6 space-y-8">
					<h2 className="text-xl font-medium">
						Isi data informasi yang akan kamu tampilkan di undanganmu!
					</h2>
					<Alert
						message="Kamu memilih paket premium dengan tema Flora Modern."
						type="info"
						className="text-primary-600"
					/>
					<div>
						<div className="flex items-center gap-2">
							<h3 className="text-base font-semibold">Data Informasi</h3>
							<Tooltip placement="bottom" title={informationTooltipMessage}>
								<InfoIcon size={16} />
							</Tooltip>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};

export default DataInformation;
