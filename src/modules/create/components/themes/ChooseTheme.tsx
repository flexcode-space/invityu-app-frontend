import React, { useState } from "react";
import Router from "next/router";
import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import ThemeCarouselSkeleton from "@/common/components/skeleton/ThemeCarouselSkeleton";
import EmptyState from "@/common/components/elements/EmptyState";

import ThemeCategory from "./ThemeCategory";
import ThemeCarousel from "./ThemeCarousel";

import { PackageProps } from "@/common/types/themes";
import CreateStepWizard from "../CreateStepWizard";

import { useGetThemeList } from "../../hooks";

const ChooseTheme: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<string>("");

	let params = {};
	if (activeCategory !== "") {
		params = { theme_category_id: activeCategory };
	}

	const { data, isLoading, isError } = useGetThemeList(params);
	const themeList = data?.data?.data || [];

	const handleViewAll = (pid: string) => {
		let url = `/create/themes/query?pid=${pid}`;
		if (activeCategory !== "") {
			url += `&cid=${activeCategory}`;
		}
		Router.push(url);
	};

	const handleCategoryChange = (id: string) => setActiveCategory(id);

	return (
		<>
			<PageHeader title={"Pilih Tema"} isFixedPosition />
			<div className="pt-20 pb-14">
				<CreateStepWizard activeStep={0} />
				<Container className="pt-5 pb-6">
					<h2 className="text-xl font-medium">
						Tentukan tema design undangan favoritmu!
					</h2>
				</Container>
				<ThemeCategory setActiveCategory={handleCategoryChange} />
				<div className="space-y-3">
					<h3 className="px-8 pt-8 text-lg font-medium">Daftar Tema</h3>
					<div className="space-y-8">
						{isLoading ? (
							<div className="flex gap-5">
								<ThemeCarouselSkeleton size={3} />
							</div>
						) : (
							<>
								{themeList?.map((item: PackageProps) => (
									<div className="space-y-4" key={item?.id}>
										<div className="px-8 flex justify-between font-medium">
											<h4>{item?.name}</h4>
											{item?.themes?.length > 3 && (
												<div
													className="flex items-center gap-1 text-sm text-primary-600 cursor-pointer hover:underline"
													onClick={() => handleViewAll(item?.id)}
												>
													Lihat Semua
												</div>
											)}
										</div>

										{item?.themes?.length ? (
											<ThemeCarousel
												className="px-8"
												themes={item?.themes}
												package_id={item?.id}
												theme_category_id={activeCategory}
											/>
										) : (
											<EmptyState className="px-8" title="Tidak ada tema" />
										)}
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default ChooseTheme;
