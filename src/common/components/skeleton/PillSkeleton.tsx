import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const PillSkeleton: FC<{ size?: number }> = ({ size = 1 }) => {
	return (
		<div className="flex gap-3 px-8">
			{Array(size)
				.fill(" ")
				.map((_, index) => (
					<Skeleton
						key={index}
						width="80px"
						height="37px"
						borderRadius="100px"
					/>
				))}
		</div>
	);
};

export default PillSkeleton;
