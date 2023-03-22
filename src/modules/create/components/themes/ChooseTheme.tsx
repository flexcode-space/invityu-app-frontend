import React from "react";
import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import ThemeCard from "./ThemeCard";
import Button from "@/common/components/elements/Button";

import { PackageProps } from "@/common/types/themes";

const packages: PackageProps[] = [
	{
		id: 1,
		name: "Ekslusif",
		themes: [
			{
				id: 1,
				title: "Glitterbloom",
				initial_price: 200000,
				price: 169000,
				tag: "Baru",
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/bamboo-olive.png",
			},
			{
				id: 2,
				title: "Chromapetal",
				initial_price: 200000,
				price: 269000,
				tag: "Populer",
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/bamboo-latte.png",
			},
			{
				id: 3,
				title: "Stellarose",
				initial_price: null,
				price: 99000,
				tag: null,
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/flora-orchid.png",
			},
		],
	},
	{
		id: 2,
		name: "Premium",
		themes: [
			{
				id: 1,
				title: "Stardaisy",
				initial_price: 200000,
				price: 99000,
				tag: "Baru",
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/flora-blush.png",
			},
			{
				id: 2,
				title: "Breezefall",
				initial_price: 200000,
				price: 10000,
				tag: null,
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/flora-jade.png",
			},
		],
	},
];

const ChooseTheme: React.FC = () => {
	return (
		<>
			<PageHeader title={"Pilih Tema"} isBackButton isFixedPosition />
			<Container className="space-y-5 pt-24 pb-16">
				<h2 className="text-xl font-medium">
					Tentukan tema design undangan favoritmu!
				</h2>
				<div className="text-red-500">pills swipeable component here</div>
				<div className="space-y-3">
					<h3 className="text-lg font-medium">Daftar Tema</h3>

					<div className="space-y-8">
						{packages.map((item) => (
							<div className="space-y-4" key={item?.id}>
								<h4 className="font-medium">{item?.name}</h4>
								<div className="grid grid-cols-2 gap-4">
									{item?.themes.map((theme, index) => (
										<ThemeCard key={index} {...theme} />
									))}
								</div>
								<div className="pt-3">
									<Button
										type="button"
										bgColor="#EBF2FC"
										textColor="#556DC2"
										borderColor="#C7D7FF"
										isBlock
									>
										Lihat Semua
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</>
	);
};
export default ChooseTheme;
