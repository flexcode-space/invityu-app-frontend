import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface Props {
	children: ReactNode;
	[key: string]: any;
}

const Footer = ({ children, ...other }: Props) => {
	return (
		<StyledFooter className="p-4" {...other}>
			{children}
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.div`
	position: fixed;
	transition-duration: 500ms;
	background-color: #ffffff;
	width: 100%;
	height: 85px;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	max-width: 480px;
	margin: 0px auto;
`;
