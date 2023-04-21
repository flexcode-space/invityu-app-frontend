import React, { FC } from "react";
import { Avatar } from "antd";
import { BiRightArrowAlt as MoreIcon } from "react-icons/bi";
import styled from "@emotion/styled";
import Router from "next/router";

type ViewMoreThemeProps = {
	pid: string;
	theme_category_id?: string;
};

const ViewMoreTheme: FC<ViewMoreThemeProps> = ({ pid, theme_category_id }) => {
	const handleViewAll = () => {
		let url = `/create/themes/query?pid=${pid}`;
		if (theme_category_id !== "") {
			url += `&cid=${theme_category_id}`;
		}
		Router.push(url);
	};

	return (
		<div className="py-2 min-w-[14rem] max-w-[14rem] w-14rem">
			<StyledViewMore
				className="flex text-center gap-5 flex-col justify-center items-center h-full rounded-xl overflow-hidden shadow-sm border border-solid border-primary-50 cursor-pointer transition-all duration-300"
				onClick={() => handleViewAll()}
			>
				<Avatar size={26} className="mr-3 text-white bg-primary-600 shadow-sm">
					<MoreIcon size="24" />
				</Avatar>
				<div className="px-12 text-sm text-primary-600 font-semibold">
					Lihat Tema Lainnya
				</div>
			</StyledViewMore>
		</div>
	);
};

export default ViewMoreTheme;

const StyledViewMore = styled.div`
	background-image: url("/images/background/bg-more.svg");
	background-size: cover;
	background-color: #daf3ff;
	width: 100%;
`;
