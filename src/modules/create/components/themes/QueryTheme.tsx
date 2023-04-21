import { useState } from "react";
import { useRouter } from "next/router";
import {
	TbListDetails as IconList,
	TbLayoutGrid as IconGrid,
} from "react-icons/tb";

import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import ThemeCardSkeleton from "@/common/components/skeleton/ThemeCardSkeleton";
import EmptyState from "@/common/components/elements/EmptyState";

import ThemeCard from "./ThemeCard";
import { ThemeProps } from "@/common/types/themes";

import { useGetThemeList } from "../../hooks";

const QueryTheme: React.FC = () => {
	const [viewOptions, setViewOptions] = useState<"list" | "grid">("list");

	const { query } = useRouter();
	const packageId = query?.pid as string;
	const themeCategoryId = query?.cid as string;

	const { data, isLoading, isError } = useGetThemeList({
		package_id: packageId,
		theme_category_id: themeCategoryId,
	});
	const packageRes = data?.data?.data[0] || {};
	const themeRes = data?.data?.data[0]?.themes || [];

	const themeList: ThemeProps[] = themeRes.map((theme: ThemeProps) => ({
		...theme,
		package_id: packageId,
	}));

	const handleViewOptions = () => {
		setViewOptions((prevViewOption) =>
			prevViewOption === "list" ? "grid" : "list"
		);
	};

	return (
		<>
			<PageHeader
				title={`Pilihan Tema ${packageRes.name || ""}`}
				isFixedPosition
				isBackButton
			/>
			<div className="pt-6 pb-14" />
			<Container className="pt-3 pb-10 space-y-3">
				<div className="flex items-center justify-between">
					<div>Filter: {packageRes.name}</div>
					{!isLoading && (
						<div className="cursor-pointer" onClick={handleViewOptions}>
							{viewOptions === "list" ? (
								<IconList size={22} />
							) : (
								<IconGrid size={22} />
							)}
						</div>
					)}
				</div>
				<div className="grid grid-cols-1 justify-items-center">
					{!isLoading ? (
						<>
							{themeList.length ? (
								<>
									{themeList.map((theme: ThemeProps, index: number) => (
										<ThemeCard
											key={index}
											{...theme}
											viewOptions={viewOptions}
											isAnimation
										/>
									))}
								</>
							) : (
								<EmptyState className="px-8 mt-3" title="Tidak ada tema" />
							)}
						</>
					) : (
						<ThemeCardSkeleton size={4} />
					)}
				</div>
			</Container>
		</>
	);
};

export default QueryTheme;
