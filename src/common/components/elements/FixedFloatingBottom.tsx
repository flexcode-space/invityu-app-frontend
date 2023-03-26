import styled from "@emotion/styled";
import React from "react";

interface FixedFloatingBottomProps {
	children: React.ReactNode;
	isShadow?: boolean;
	isRounded?: boolean;
	className?: string;
	[propName: string]: any;
}

const FixedFloatingBottom: React.FC<FixedFloatingBottomProps> = ({
	children,
	isShadow = false,
	isRounded = false,
	className,
	...others
}) => {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-transparent">
			<StyledComponent
				className={`mx-auto bg-white max-w-[480px] ${className}`}
				{...others}
				isShadow={isShadow}
				isRounded={isRounded}
			>
				{children}
			</StyledComponent>
		</div>
	);
};

export default FixedFloatingBottom;

const StyledComponent = styled.div<FixedFloatingBottomProps>`
	${({ isShadow }) =>
		isShadow &&
		`
			box-shadow: rgba(108, 114, 124, 0.16) 0px -2px 4px 0px;
  `}

	${({ isRounded }) =>
		isRounded &&
		`
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		`}
`;
