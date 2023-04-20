import React, { ReactNode } from "react";
import InlineLoader from "./InlineLoader";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface ButtonIconProps {
	isLoading?: boolean;
	isOutline?: boolean;
	isBlock?: boolean;
	onClick?: () => void;
	isDisabled?: boolean;
	textColor?: string;
	borderColor?: string;
	backgroundColor?: string;
	icon?: string;
	type?: "button" | "submit" | "reset" | undefined;
	children: ReactNode;
	[key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
	isLoading = false,
	isOutline = false,
	isBlock = false,
	onClick,
	isDisabled = false,
	textColor = "#252525",
	borderColor = "var(--bg-primary-100)",
	backgroundColor = "#fff",
	icon,
	type,
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

const StyledButton = styled.button<ButtonIconProps>`
	display: inline-flex;
	justify-content: center;
	gap: 10px;
	width: ${({ isBlock }) => (isBlock ? "100%" : "auto")};
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: ${({ textColor }) => textColor};
	padding: 12px;
	border: 2px solid ${({ borderColor }) => borderColor};
	border-radius: 15px;
	cursor: pointer;
	font-weight: 600;

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
