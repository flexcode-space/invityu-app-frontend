import React from "react";
import Router from "next/router";
import { BiChevronRight as RightArrowIcon } from "react-icons/bi";

import { logout } from "@/common/utils/auth";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Card from "./Card";
import Image from "./Image";
import { Checkbox, Tag } from "antd";

interface MenuItem {
	order: number;
	id: string;
	title: string;
	description?: string | null;
	target: string;
	icon: string | null;
	isRequired: boolean;
	tag: string | null;
	isChecked?: boolean;
}

interface MenuProps {
	menus: MenuItem[][];
	isCheckbox?: boolean;
	isClickable?: boolean;
	isChevron?: boolean;
	checkedMenu?: (item: {}) => void;
	unCheckedMenu?: (item: {}) => void;
}

const handleClick = (target: string) => {
	const checkTarget = target.substring(0, 1).includes("/");
	if (checkTarget) {
		Router.push(target);
	} else if (logout) {
		logout();
	}
};

const Menu: React.FC<MenuProps> = ({
	menus,
	isCheckbox,
	isClickable,
	isChevron,
	checkedMenu,
	unCheckedMenu,
}) => {
	const lastMenu = menus.map((i) => i[i.length - 1]);

	const handleCheckMenu = (item: any) => {
		const updatedItem = { ...item, isChecked: !item.isChecked };
		if (updatedItem.isChecked && checkedMenu) {
			checkedMenu(updatedItem);
		} else if (!updatedItem.isChecked && unCheckedMenu) {
			unCheckedMenu(updatedItem);
		}
	};

	const checkedValues = menus[0]
		.filter((item: any) => item.isChecked === true)
		.map((item: any) => item.id);

	return (
		<div className="mb-8 space-y-6">
			{menus.map((child, index) => (
				<Card key={index} className="p-0" borderColor="#EBF2FC">
					{child.map((item, key) => (
						<StyledMenuItem
							key={key}
							className={`pt-4 pb-3 px-6 cursor-pointer hover:bg-gray-50 ${
								isClickable ? "" : "cursor-default"
							}`}
							isLast={item?.id !== lastMenu[index].id}
							onClick={() => (isClickable ? handleClick(item?.target) : "")}
							disabled={!isClickable}
						>
							<Checkbox.Group
								className="w-full"
								name="menu"
								value={checkedValues}
							>
								<div className="flex items-center w-full gap-5">
									{isCheckbox && (
										<Checkbox
											value={item?.id}
											checked={item?.isChecked}
											onChange={() => handleCheckMenu(item)}
										/>
									)}
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
												<span className="text-red-500">*</span>
											)}
											{item?.tag && (
												<Tag
													color={item?.tag === "Premium" ? "purple" : "gold"}
													className="ml-2 rounded-xl"
												>
													{item?.tag}
												</Tag>
											)}
										</div>
										{item?.description && (
											<span className="text-gray-500 text-sm">
												{item?.description}
											</span>
										)}
									</div>
									{isChevron && (
										<div>
											<RightArrowIcon
												size="24"
												className="align-middle text-primary-600"
											/>
										</div>
									)}
								</div>
							</Checkbox.Group>
						</StyledMenuItem>
					))}
				</Card>
			))}
		</div>
	);
};

export default Menu;

const StyledMenuItem = styled.div<{ isLast: boolean; disabled: boolean }>`
	${({ isLast }) =>
		isLast &&
		css`
			border-bottom: 1px solid #f3f3f3;
		`}
`;
