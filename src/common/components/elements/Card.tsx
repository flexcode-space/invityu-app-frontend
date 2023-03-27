import React, { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
	children: React.ReactNode;
	transition?: boolean;
	clickable?: boolean;
	minHeight?: string;
	maxHeight?: string;
	bgColor?: string;
	borderColor?: string;
	textColor?: string;
	[key: string]: any;
}

const Card: FC<Props> = ({
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

interface StyledCardProps {
	clickable?: boolean;
	transition?: boolean;
	minHeight?: string;
	maxHeight?: string;
	bgColor?: string;
	borderColor?: string;
	textColor?: string;
}

const StyledCard = styled.div<StyledCardProps>`
	background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
	margin: 1rem 0;
	box-shadow: rgb(0 0 0 / 5%) 0px 1px 6px 0px;
	border-radius: 10px;

	min-height: ${(props) => (props.minHeight ? props.minHeight : "unset")};
	max-height: ${(props) => (props.maxHeight ? props.maxHeight : "unset")};
	color: ${(props) => (props.textColor ? props.textColor : "unset")};
	border: ${(props) =>
		props.borderColor ? `1px solid ${props.borderColor}` : "unset"};

	${(props) =>
		props.clickable &&
		css`
			cursor: pointer;
		`}

	${(props) =>
		props.transition &&
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
