import React, { FC, ReactNode } from "react";
import InlineLoader from "./InlineLoader";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type ButtonIconProps = {
	isLoading?: boolean;
	isOutline?: boolean;
	isBlock?: boolean;
	onClick?: () => void;
	isDisabled?: boolean;
	textColor?: string;
	borderColor?: string;
	backgroundColor?: string;
	icon?: string;
	children: ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
};

const ButtonIcon: FC<ButtonIconProps> = ({
	isLoading,
	isOutline,
	isBlock,
	onClick,
	isDisabled,
	textColor,
	borderColor,
	backgroundColor,
	icon,
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
					textColor={textColor}
					borderColor={borderColor}
					backgroundColor={backgroundColor}
					{...other}
				>
					{icon && <Image src={icon} width={20} height={15} alt="id" />}{" "}
					{children}
				</StyledButton>
			)}
		</>
	);
};

export default ButtonIcon;

type StyledButtonProps = {
	isOutline?: boolean;
	isBlock?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	textColor?: string;
	borderColor?: string;
	backgroundColor?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
	display: inline-flex;
	justify-content: center;
	gap: 10px;
	width: ${({ isBlock }) => (isBlock ? "100%" : "auto")};
	/* background-color: "#fff"; */
	background-color: ${({ backgroundColor }) => backgroundColor ?? "#fff"};
	/* color: #252525; */
	color: ${({ textColor }) => textColor ?? "#252525"};
	padding: 12px;
	/* border: 1px solid var(--bg-primary-100); */
	border: 1px solid
		${({ borderColor }) => borderColor ?? "var(--bg-primary-100)"};
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
