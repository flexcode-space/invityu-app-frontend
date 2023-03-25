import Pills from "@/common/components/elements/Pills";
import React from "react";

const ThemeCategory = () => {
	const items = ["Semua", "Modern", "Classic", "Nature", "Religi", "Anime"];
	const handlePillChange = (index: number) => {
		console.log(`Selected pill index: ${index}`);
	};

	return <Pills items={items} onChange={handlePillChange} />;
};

export default ThemeCategory;
