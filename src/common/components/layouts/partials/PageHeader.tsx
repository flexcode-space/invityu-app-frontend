import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { BiLeftArrowAlt as BackIcon } from "react-icons/bi";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";
import { Avatar } from "antd";
import { logout } from "@/common/utils/auth";

interface Props {
	title: string;
	isBackButton?: boolean;
	isFixedPosition?: boolean;
}

const PageHeader: React.FC<Props> = ({
	title,
	isBackButton,
	isFixedPosition = false,
}) => {
	const route = useRouter();

	return (
		<StyledHeader isFixedPosition={isFixedPosition}>
			<div className="flex items-center w-full justify-between ">
				<div className="flex items-center">
					{isBackButton && (
						<StyledBack
							size={26}
							onClick={() => route.back()}
							className="mr-3 text-primary-600 bg-white"
						>
							<BackIcon size="24" />
						</StyledBack>
					)}
					<div className="mb-0 text-lg font-medium">{title}</div>
				</div>
				<LogoutIcon size="24" className="cursor-pointer" onClick={logout} />
			</div>
		</StyledHeader>
	);
};

export default PageHeader;

const StyledHeader = styled.div<{ isFixedPosition: boolean }>`
	position: ${(props) => (props.isFixedPosition ? "fixed" : "initial")};
	max-width: 480px;
	top: 0;
	background-color: var(--bg-primary-600);
	color: #fff;
	width: 100%;
	height: 60px;
	z-index: 9;
	display: flex;
	align-items: center;
	padding: 0.5rem 2rem;
	box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
`;

const StyledBack = styled(Avatar)`
	cursor: pointer;
`;
