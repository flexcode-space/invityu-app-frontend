import React from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import { Avatar } from "antd";
import { HiArrowSmLeft as BackIcon } from "react-icons/hi";

interface BackButtonProps {
	route: string;
}

const BackButton: React.FC<BackButtonProps> = ({ route }) => {
	return (
		<StyledBack
			onClick={() => Router.push(route)}
			className="mr-3 text-white bg-primary-600"
		>
			<BackIcon size="22" className="mt-1" style={{ marginRight: "1px" }} />
		</StyledBack>
	);
};

export default BackButton;

const StyledBack = styled(Avatar)`
	box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
	cursor: pointer;
`;
