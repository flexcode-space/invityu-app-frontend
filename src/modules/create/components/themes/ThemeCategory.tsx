import React, { useState } from "react";
import PillsCarousel from "@/common/components/elements/PillsCarousel";

const ThemeCategory = () => {
	const items = [
		"Semua",
		"Modern",
		"Classic",
		"Nature",
		"Religi",
		"Anime",
		"Redbull",
		"Megachan",
	];

	const [activeIndex, setActiveIndex] = useState<number>(0);

	const handleIndexChange = (index: number) => {
		console.log("handleIndexChange : ", index);
		setActiveIndex(index);
	};

	return (
		<PillsCarousel
			items={items}
			activeIndex={activeIndex}
			onChange={handleIndexChange}
		/>
	);
};

export default ThemeCategory;
