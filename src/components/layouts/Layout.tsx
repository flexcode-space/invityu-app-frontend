import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

type LayoutPropsType = {
	children: ReactNode;
};

const Layout: FC<LayoutPropsType> = (props) => {
	const { children } = props;

	return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;

const StyledLayout = styled.div`
	max-width: 480px;
	margin: 0px auto;
	background-color: #fff;
	/* min-height: calc(100vh - 62px); */

	@media (min-width: 481px) {
		min-height: 100vh;
		box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
	}
`;
