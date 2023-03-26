import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import ThemeCard from "./ThemeCard";
import ViewMoreTheme from "./ViewMoreTheme";

import { ThemeCarouselProps } from "@/common/types/themes";

const ThemeCarousel: React.FC<ThemeCarouselProps> = ({ themes, className }) => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	return (
		<div
			className={`flex gap-5 overflow-x-scroll scrollbar-hide ${className}`}
			{...events}
			ref={ref}
			data-aos="fade-left"
		>
			{themes.map((theme, index) => (
				<ThemeCard key={index} {...theme} />
			))}
			<ViewMoreTheme />
		</div>
	);
};

export default ThemeCarousel;
