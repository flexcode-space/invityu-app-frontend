import styled from "@emotion/styled";
import React, { FC, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useDraggable } from "react-use-draggable-scroll";

const ThemeCarouselSkeleton: FC<{ size?: number }> = ({ size = 1 }) => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	return (
		<div
			className="flex gap-5 overflow-x-scroll scrollbar-hide px-8"
			{...events}
			ref={ref}
		>
			{Array(size)
				.fill(" ")
				.map((_, index) => (
					<div key={index} {...events}>
						<div className="rounded-xl overflow-hidden shadow-sm border border-solid border-gray-100 transition-all duration-300 w-full">
							<StyledSkeleton height="208px" width="208px" />
							<div className="p-4">
								<Skeleton />
								<Skeleton width="70%" />
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default ThemeCarouselSkeleton;

const StyledSkeleton = styled(Skeleton)`
	line-height: unset !important;
	border-radius: unset !important;
`;
