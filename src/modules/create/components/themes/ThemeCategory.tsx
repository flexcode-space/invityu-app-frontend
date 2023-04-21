import React, { FC, useState } from "react";
import PillsCarousel from "@/common/components/elements/PillsCarousel";
import PillSkeleton from "@/common/components/skeleton/PillSkeleton";

import { useGetThemeCategory } from "../../hooks";

interface ThemeCategoryProps {
	setActiveCategory: (index: string) => void;
}

const ThemeCategory: FC<ThemeCategoryProps> = ({ setActiveCategory }) => {
	const { data, isLoading, isError } = useGetThemeCategory();
	const themeCategories = data?.data?.data || [];

	const themeCategoriesNew = [{ id: "", name: "Semua" }, ...themeCategories];

	const [activeId, setActiveId] = useState<string>("");

	const handleIndexChange = (id: string) => {
		setActiveId(id);
		setActiveCategory(id);
	};

	return (
		<>
			{!isLoading ? (
				<PillsCarousel
					items={themeCategoriesNew}
					activeId={activeId}
					onChange={handleIndexChange}
				/>
			) : (
				<PillSkeleton size={3} />
			)}
		</>
	);
};

export default ThemeCategory;
