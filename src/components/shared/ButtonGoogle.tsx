import React, { FC, ReactNode } from "react";
import InlineLoader from "./InlineLoader";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type ButtonGoogleProps = {
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

const ButtonGoogle: FC<ButtonGoogleProps> = ({
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
					<Image
						src="/images/icons/ic-google.svg"
						width={20}
						height={15}
						alt="id"
					/>{" "}
					{children}
				</StyledButton>
			)}
		</>
	);
};

export default ButtonGoogle;

type StyledButtonProps = {
	isOutline?: boolean;
	isBlock?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	color?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
	display: inline-flex;
	justify-content: center;
	gap: 10px;
	width: ${({ isBlock }) => (isBlock ? "100%" : "auto")};
	background-color: "#fff";
	color: #252525;
	padding: 12px;
	border: 1px solid #c7d7ff;
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
			border: 2px solid #eee !important;
			color: #a9a7a7 !important;
		`}
`;
