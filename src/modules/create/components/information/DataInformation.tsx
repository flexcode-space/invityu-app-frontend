import { Alert, Tooltip } from "antd";
import React, { useState } from "react";
import { FcInfo as InfoIcon } from "react-icons/fc";
import { IoIosAddCircle as AddIcon } from "react-icons/io";

import Button from "@/common/components/elements/Button";
import Card from "@/common/components/elements/Card";
import Container from "@/common/components/elements/Container";
import FixedFloatingBottom from "@/common/components/elements/FixedFloatingBottom";
import Menu from "@/common/components/elements/Menu";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import { createDataInformationMenu } from "@/common/constant/menu";

import CreateStepWizard from "../CreateStepWizard";
import ModalSheet from "@/common/components/elements/ModalSheet";

const DataInformation: React.FC = () => {
	const [isOpenAddDataModal, setOpenAddDataModal] = useState<boolean>(false);

	const informationTooltipMessage =
		"Kamu masih dapat merubah semua informasi data kapan saja, kecuali link undangan.";

	return (
		<>
			<PageHeader title={`Data Informasi`} isFixedPosition isBackButton />
			<div className="py-20">
				<CreateStepWizard activeStep={1} />
				<Container className="pt-5 pb-6 space-y-8">
					<h2 className="text-xl font-medium">
						Isi data informasi yang akan kamu tampilkan di undanganmu!
					</h2>
					<Alert
						message="Kamu memilih paket premium dengan tema Flora Modern."
						type="info"
						className="text-primary-600 text-sm"
					/>
					<div className="pb-8">
						<div className="flex items-center gap-2">
							<h3 className="text-base font-semibold">Data Informasi</h3>
							<Tooltip
								placement="bottom"
								title={informationTooltipMessage}
								overlayStyle={{ fontSize: "12px" }}
							>
								<InfoIcon size={16} />
							</Tooltip>
						</div>
						<div>
							<Menu menus={createDataInformationMenu} />

							<Card
								className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 cursor-pointer"
								borderColor="#EBF2FC"
								onClick={() => setOpenAddDataModal(true)}
							>
								<AddIcon size={20} className="text-primary-600" />
								<div>Data Informasi</div>
								<ModalSheet
									title="Buat Undangan Baru"
									isOpen={isOpenAddDataModal}
									onClose={() => setOpenAddDataModal(false)}
								>
									<div className="px-6 pb-5 bg-white">
										<Menu menus={createDataInformationMenu} />
									</div>
								</ModalSheet>
							</Card>
						</div>
					</div>
				</Container>
				<FixedFloatingBottom
					isShadow
					className="flex p-5 w-full items-center justify-between gap-5"
				>
					<Button isBlock>Lihat Preview Undangan</Button>
				</FixedFloatingBottom>
			</div>
		</>
	);
};

export default DataInformation;
