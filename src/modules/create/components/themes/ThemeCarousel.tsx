import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import ThemeCard from "./ThemeCard";
import ViewMoreTheme from "./ViewMoreTheme";

import { ThemeCarouselProps } from "@/common/types/themes";

const ThemeCarousel: React.FC<ThemeCarouselProps> = ({
	themes,
	package_id,
	theme_category_id,
	className,
}) => {
	const themeList =
		themes?.map((theme) => {
			return {
				...theme,
				package_id,
			};
		}) || [];

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
			{themeList &&
				themeList?.map((theme, index) => <ThemeCard key={index} {...theme} />)}
			{themes?.length > 3 && (
				<ViewMoreTheme pid={package_id} theme_category_id={theme_category_id} />
			)}
		</div>
	);
};

export default ThemeCarousel;
