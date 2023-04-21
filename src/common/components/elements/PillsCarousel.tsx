import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface ThemeCategoriesProps {
	id: string;
	name: string;
}

interface PillsProps {
	items: ThemeCategoriesProps[];
	activeId: string;
	onChange: (index: string) => void;
}

const PillsCarousel: React.FC<PillsProps> = ({ items, activeId, onChange }) => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const pills = items.map((item: ThemeCategoriesProps, index: number) => (
		<button
			key={index}
			className={`px-4 py-2 rounded-full mr-2 font-medium ${
				activeId === item?.id
					? "bg-secondary-400 text-white"
					: "bg-white text-secondary-400"
			}`}
			onClick={() => onChange(item?.id)}
		>
			{item?.name}
		</button>
	));

	return (
		<div
			className="px-8 flex overflow-x-scroll scrollbar-hide"
			{...events}
			ref={ref}
		>
			<>{pills}</>
		</div>
	);
};

export default PillsCarousel;
