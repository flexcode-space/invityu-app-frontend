import React from "react";
import Router from "next/router";
import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import ThemeCarouselSkeleton from "@/common/components/skeleton/ThemeCarouselSkeleton";

import ThemeCategory from "./ThemeCategory";
import ThemeCarousel from "./ThemeCarousel";

import { PackageProps } from "@/common/types/themes";
import CreateStepWizard from "../CreateStepWizard";

import { useGetThemeList } from "../../hooks";

const ChooseTheme: React.FC = () => {
	const { data, isLoading, isError } = useGetThemeList({});
	console.log("🚀 aulianza ~ file: ChooseTheme.tsx:16 ~ isLoading:", isLoading);
	const themeList = data?.data?.data || [];

	const handleViewAll = (pid: string) => {
		Router.push(`/create/themes/query?pid=${pid}`);
	};

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
				<ThemeCategory />
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

										<ThemeCarousel
											className="px-8"
											themes={item?.themes}
											package_id={item?.id}
										/>
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
