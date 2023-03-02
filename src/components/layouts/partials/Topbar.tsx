import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Topbar = ({ children }: Props) => {
	return <StyledTopbar>{children}</StyledTopbar>;
};

export default Topbar;

const StyledTopbar = styled.div`
	background-color: #ffffff;
	width: 100%;
	height: 65px;
	z-index: 2;
	display: flex;
	align-items: center;
	padding: 1.2rem;
`;
