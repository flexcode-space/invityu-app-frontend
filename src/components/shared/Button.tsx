import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import InlineLoader from "./InlineLoader";

type ButtonProps = {
	isLoading?: boolean;
	isOutline?: boolean;
	isBlock?: boolean;
	onClick?: () => void;
	isDisabled?: boolean;
	color?: string;
	children: ReactNode;
	className?: string;
};

const Button: FC<ButtonProps> = ({
	isLoading,
	isOutline,
	isBlock,
	onClick,
	isDisabled,
	color,
	children,
	...other
}) => {
	return (
		<>
			{isLoading ? (
				<StyledButton
					isOutline={isOutline}
					isBlock={isBlock}
					disabled={true}
					color={color}
					{...other}
				>
					<InlineLoader />
				</StyledButton>
			) : (
				<StyledButton
					isOutline={isOutline}
					isBlock={isBlock}
					onClick={onClick}
					disabled={isDisabled}
					color={color}
					{...other}
				>
					{children}
				</StyledButton>
			)}
		</>
	);
};

export default Button;

type StyledButtonProps = {
	isOutline?: boolean;
	isBlock?: boolean;
	disabled?: boolean;
	color?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
	width: ${({ isBlock }) => (isBlock ? "auto" : "100%")};
	background-color: ${({ isOutline, color }) =>
		!isOutline ? color || "#003A87" : "#fff"};
	color: ${({ isOutline }) => (!isOutline ? "#fff" : "#003A87")};
	padding: 0.7rem;
	border: 2px solid #003a87;
	border-radius: 10px;
	cursor: pointer;
	font-weight: 500;

	transition: all 250ms ease;
	will-change: transition;
	transform: translateY(0px);

	&:hover {
		box-shadow: rgb(0 0 0 / 5%) 0px 1px 6px 0px;
		transform: translateY(-1px);
	}

	${({ disabled }) =>
		disabled &&
		css`
			cursor: no-drop !important;
			background: #eee !important;
			border: 2px solid #eee !important;
			color: #a9a7a7 !important;
		`}
`;
