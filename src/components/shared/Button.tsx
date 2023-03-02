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
	type?: "button" | "submit" | "reset" | undefined;
};

const Button: FC<ButtonProps> = ({
	isLoading,
	isOutline,
	isBlock,
	onClick,
	isDisabled,
	color,
	children,
	type,
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
					isLoading={isLoading}
					{...other}
				>
					<InlineLoader />
				</StyledButton>
			) : (
				<StyledButton
					type={type}
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
	isLoading?: boolean;
	color?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
	width: ${({ isBlock }) => (isBlock ? "100%" : "auto")};
	background-color: ${({ isOutline, color }) =>
		!isOutline ? color || "var(--bg-primary)" : "#fff"};
	color: ${({ isOutline }) => (!isOutline ? "#fff" : "var(--bg-primary)")};
	padding: 12px;
	border: 1px solid var(--bg-primary);
	border-radius: 15px;
	cursor: pointer;
	font-weight: 500;

	transition: all 250ms ease;
	will-change: transition;
	transform: translateY(0px);

	${({ isLoading }) =>
		!isLoading &&
		css`
			&:hover {
				box-shadow: rgb(0 0 0 / 5%) 0px 1px 6px 0px;
				transform: translateY(-1px);
			}
		`}

	${({ disabled }) =>
		disabled &&
		css`
			cursor: no-drop !important;
			background: #eee !important;
			border: 1px solid #eee !important;
			color: #a9a7a7 !important;
		`}
`;
