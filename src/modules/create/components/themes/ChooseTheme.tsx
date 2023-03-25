import React from "react";
import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import Button from "@/common/components/elements/Button";

import ThemeCategory from "./ThemeCategory";
import ThemeCarousel from "./ThemeCarousel";

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
			{
				id: 4,
				title: "Closedaisy",
				initial_price: 200000,
				price: 99000,
				tag: null,
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/flora-blush.png",
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
			{
				id: 3,
				title: "Breaisnole",
				initial_price: null,
				price: 99000,
				tag: null,
				image:
					"https://api-dev.invityu.com/assets/global/images/themes/flora-orchid.png",
			},
		],
	},
];

const ChooseTheme: React.FC = () => {
	return (
		<>
			<PageHeader title={"Pilih Tema"} isBackButton isFixedPosition />
			<Container className="pt-24 pb-6">
				<h2 className="text-xl font-medium">
					Tentukan tema design undangan favoritmu!
				</h2>
			</Container>
			<ThemeCategory />
			<div className="pb-14">
				<div className="space-y-3">
					<h3 className="px-8 pt-8 text-lg font-medium">Daftar Tema</h3>
					<div className="space-y-8">
						{packages.map((item) => (
							<div className="space-y-4" key={item?.id}>
								<h4 className="px-8 font-medium">{item?.name}</h4>
								<ThemeCarousel className="px-8" themes={item?.themes} />
								<div className="px-8 pt-3">
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
			</div>
		</>
	);
};
export default ChooseTheme;
