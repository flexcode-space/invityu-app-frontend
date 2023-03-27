import Router from "next/router";
import React from "react";
import { BiChevronRight as RightArrowIcon } from "react-icons/bi";

import { logout } from "@/common/utils/auth";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Card from "./Card";
import Image from "./Image";

interface MenuItem {
	id: number;
	title: string;
	description?: string | null;
	target: string;
	icon: string | null;
	isRequired: boolean;
}

interface MenuProps {
	menus: MenuItem[][];
}

const handleClick = (target: string) => {
	const checkTarget = target.substring(0, 1).includes("/");
	if (checkTarget) {
		Router.push(target);
	} else if (logout) {
		logout();
	}
};

const Menu = (props: MenuProps) => {
	const lastMenu = props.menus.map((i) => i[i.length - 1]);

	return (
		<div className="mb-8 space-y-6">
			{props.menus.map((child, index) => (
				<Card key={index} className="p-0" borderColor="#EBF2FC">
					{child.map((item, key) => (
						<StyledMenuItem
							key={key}
							className="py-4 px-6 cursor-pointer hover:bg-gray-50 "
							isLast={item?.id !== lastMenu[index].id}
							onClick={() => handleClick(item?.target)}
						>
							<div className="flex items-center w-full gap-5">
								{item?.icon && (
									<div className="w-fit">
										<Image
											src={item?.icon}
											width={55}
											height={55}
											alt={item?.title}
										/>
									</div>
								)}
								<div className="w-full">
									<div className="flex">
										<span>{item?.title}</span>
										{item?.isRequired && (
											<span className="ml-1 text-red-500">*</span>
										)}
									</div>
									{item?.description && (
										<span className="text-gray-500 text-sm">
											{item?.description}
										</span>
									)}
								</div>
								<div>
									<RightArrowIcon
										size="24"
										className="align-middle text-primary-600"
									/>
								</div>
							</div>
						</StyledMenuItem>
					))}
				</Card>
			))}
		</div>
	);
};

export default Menu;

const StyledMenuItem = styled.div<{ isLast: boolean }>`
	${({ isLast }) =>
		isLast &&
		css`
			border-bottom: 1px solid #f3f3f3;
		`}
`;
