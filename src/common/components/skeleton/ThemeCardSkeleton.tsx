import styled from "@emotion/styled";
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const ThemeCardSkeleton: FC<{ size?: number }> = ({ size = 1 }) => {
	return (
		<>
			{Array(size)
				.fill(" ")
				.map((_, index) => (
					<div key={index} className="py-2 min-w-full max-w-full w-full">
						<div className="rounded-xl overflow-hidden shadow-sm border border-solid border-gray-100 transition-all duration-300">
							<div className="flex">
								<div>
									<StyledSkeleton height="150px" width="150px" />
								</div>
								<div className="flex flex-col justify-between p-4 space-y-1 w-full">
									<div>
										<Skeleton width="70%" />
										<p className="text-sm text-gray-500 mt-2">
											<Skeleton width="50%" />
										</p>
									</div>
									<Skeleton width="50%" />
								</div>
							</div>
						</div>
					</div>
				))}
		</>
	);
};

export default ThemeCardSkeleton;

const StyledSkeleton = styled(Skeleton)`
	line-height: unset !important;
	border-radius: unset !important;
`;
