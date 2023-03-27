import React, { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface StyledCardProps {
	children: React.ReactNode;
	transition?: boolean;
	clickable?: boolean;
	minHeight?: string;
	maxHeight?: string;
	bgColor?: string;
	borderColor?: string;
	textColor?: string;
	isShadow?: boolean;
	[key: string]: any;
}

const Card: FC<StyledCardProps> = ({
	children,
	transition,
	clickable,
	minHeight,
	maxHeight,
	bgColor,
	borderColor,
	textColor,
	...others
}) => {
	return (
		<StyledCard
			minHeight={minHeight}
			maxHeight={maxHeight}
			transition={transition}
			clickable={clickable}
			bgColor={bgColor}
			borderColor={borderColor}
			textColor={textColor}
			{...others}
		>
			{children}
		</StyledCard>
	);
};

export default Card;

const StyledCard = styled.div<StyledCardProps>`
	background-color: ${({ bgColor = "#fff" }) => bgColor};
	margin: 1rem 0;
	border-radius: 10px;
	min-height: ${({ minHeight = "unset" }) => minHeight};
	max-height: ${({ maxHeight = "unset" }) => maxHeight};
	color: ${({ textColor = "unset" }) => textColor};
	border: ${({ borderColor }) => borderColor && `1px solid ${borderColor}`};
	box-shadow: 0px 4px 10px rgba(223, 237, 255, 0.1);

	${({ isShadow }) =>
		isShadow &&
		css`
			box-shadow: rgb(0 0 0 / 5%) 0px 1px 6px 0px !important;
		`}

	${({ clickable }) =>
		clickable &&
		css`
			cursor: pointer;
		`}

	${({ transition }) =>
		transition &&
		css`
			transition: all 250ms ease;
			will-change: transition;
			transform: translateY(0px);

			&:hover {
				box-shadow: 0 3px 16px 0 rgb(0 0 0 / 10%);
				transform: translateY(-1px);
			}
		`}
`;
