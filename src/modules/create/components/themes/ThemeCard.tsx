import { ReactNode } from "react";
import Router from "next/router";
import { Badge } from "antd";
import styled from "@emotion/styled";

import Image from "@/common/components/elements/Image";
import { tagColor } from "@/common/constant/color";
import { formatCurrency } from "@/common/helpers";
import { ThemeProps } from "@/common/types/themes";

import { url } from "@/common/constant/url";

const ThemeCard: React.FC<ThemeProps> = ({
	id,
	image,
	name,
	description,
	initial_price,
	price,
	tag,
	package_id,
	viewOptions,
	isAnimation,
}) => {
	const defaultTag = "Baru";

	const CardComponent = () => {
		const handleThemePreview = () => {
			// TODO: another approach is store into state
			Router.push(`${url.INVITATION_PREVIEW}?pid=${package_id}&id=${id}`);
		};

		return (
			<div
				className="rounded-xl overflow-hidden shadow-sm border border-solid border-primary-50 cursor-pointer transition-all duration-300 hover:shadow-md"
				onClick={handleThemePreview}
			>
				{viewOptions === "list" ? (
					<div className="flex">
						<Image src={image} width={150} height={150} alt={name} />
						<div className="flex flex-col justify-between p-4 space-y-1">
							<div>
								<div className="font-medium">{name}</div>
								<p className="text-sm text-gray-500 mt-2">{description}</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 font-medium">
									{formatCurrency(price)}
								</p>
								{initial_price && (
									<p className="text-gray-400 text-sm line-through">
										{formatCurrency(initial_price)}
									</p>
								)}
							</div>
						</div>
					</div>
				) : (
					<>
						<Image
							src={image}
							width={viewOptions === "grid" ? 500 : 300}
							height={viewOptions === "grid" ? 500 : 300}
							alt={name}
						/>
						<div className="p-4 space-y-1">
							<div className="font-medium">{name}</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 font-medium">
									{formatCurrency(price)}
								</p>
								{initial_price && (
									<p className="text-gray-400 text-sm line-through">
										{formatCurrency(initial_price)}
									</p>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		);
	};

	const CardWithRibbon = () => {
		return (
			<StyledRibbon text={tag} color={tagColor[tag ?? defaultTag]}>
				<CardComponent />
			</StyledRibbon>
		);
	};

	const CardWidthWrapper = ({
		children,
		viewOptions,
		isAnimation = false,
	}: {
		children: ReactNode;
		viewOptions?: string;
		isAnimation?: boolean;
	}) => {
		const cardWidthClasses =
			viewOptions === "grid"
				? "py-2 min-w-full max-w-full w-full"
				: "py-2 min-w-[14rem] max-w-[14rem] w-14rem";

		const cardListView = "py-2 min-w-full max-w-full w-full";

		return (
			<div
				className={viewOptions === "list" ? cardListView : cardWidthClasses}
				data-aos={isAnimation && "fade-up"}
			>
				{children}
			</div>
		);
	};

	if (tag) {
		return (
			<CardWidthWrapper viewOptions={viewOptions} isAnimation={isAnimation}>
				<CardWithRibbon />
			</CardWidthWrapper>
		);
	} else {
		return (
			<CardWidthWrapper viewOptions={viewOptions} isAnimation={isAnimation}>
				<CardComponent />
			</CardWidthWrapper>
		);
	}
};

export default ThemeCard;

const StyledRibbon = styled(Badge.Ribbon)`
	font-size: 11px;
`;
