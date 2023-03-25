import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface PillsProps {
	items: string[];
	activeIndex: number;
	onChange: (index: number) => void;
}

const PillsCarousel: React.FC<PillsProps> = ({
	items,
	activeIndex,
	onChange,
}) => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const pills = items.map((item, index) => (
		<button
			key={index}
			className={`px-4 py-2 rounded-full mr-2 font-medium ${
				activeIndex === index
					? "bg-secondary-400 text-white"
					: "bg-white text-secondary-400"
			}`}
			onClick={() => onChange(index)}
		>
			{item}
		</button>
	));

	return (
		<div
			className="flex overflow-x-scroll scrollbar-hide"
			{...events}
			ref={ref}
		>
			<>{pills}</>
		</div>
	);
};

export default PillsCarousel;
