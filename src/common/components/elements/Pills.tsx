import React, { useState } from "react";
import Pill from "./Pill";

type PillsProps = {
	items: string[];
	activeIndex?: number;
	onChange?: (index: number) => void;
};

const Pills: React.FC<PillsProps> = ({ items, activeIndex = 0, onChange }) => {
	const [active, setActive] = useState(activeIndex);

	const handlePillClick = (index: number) => {
		setActive(index);
		if (onChange) {
			onChange(index);
		}
	};

	const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
		const { clientX: startX } = event.touches[0];
		let currentX = startX;

		const handleTouchMove = (event: TouchEvent) => {
			currentX = event.touches[0].clientX;
		};

		const handleTouchEnd = () => {
			const deltaX = startX - currentX;

			if (deltaX > 50 && active < items.length - 1) {
				setActive(active + 1);
				if (onChange) {
					onChange(active + 1);
				}
			} else if (deltaX < -50 && active > 0) {
				setActive(active - 1);
				if (onChange) {
					onChange(active - 1);
				}
			}

			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};

		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);
	};

	return (
		<div
			className="flex overflow-x-scroll gap-3 scrollbar-hide"
			onTouchStart={handleSwipe}
			style={{ touchAction: "pan-y" }}
		>
			{items.map((item, index) => (
				<Pill
					key={item}
					label={item}
					active={index === active}
					onClick={() => handlePillClick(index)}
				/>
			))}
		</div>
	);
};

export default Pills;
