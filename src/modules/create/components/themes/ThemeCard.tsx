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
	initial_price,
	price,
	tag,
}) => {
	const defaultTag = "Populer";

	const CardComponent = () => {
		const handleThemePreview = () =>
			Router.push(`${url.INVITATION_PREVIEW}?id=${id}`);

		return (
			<div
				className="rounded-xl overflow-hidden shadow-sm border border-solid border-primary-50 cursor-pointer transition-all duration-300 hover:shadow-md"
				onClick={handleThemePreview}
			>
				<Image src={image} width={300} height={300} alt={name} />
				<div className="p-4 space-y-1">
					<div className="font-medium">{name}</div>
					<div className="flex items-center gap-2">
						<p className="text-gray-600 font-medium">{formatCurrency(price)}</p>
						{initial_price && (
							<p className="text-gray-400 text-sm line-through">
								{formatCurrency(initial_price)}
							</p>
						)}
					</div>
				</div>
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

	const CardWidthWrapper = ({ children }: { children: ReactNode }) => {
		return (
			<div className="py-2 min-w-[14rem] max-w-[14rem] w-14rem">{children}</div>
		);
	};

	if (tag) {
		return (
			<CardWidthWrapper>
				<CardWithRibbon />
			</CardWidthWrapper>
		);
	} else {
		return (
			<CardWidthWrapper>
				<CardComponent />
			</CardWidthWrapper>
		);
	}
};

export default ThemeCard;

const StyledRibbon = styled(Badge.Ribbon)`
	font-size: 11px;
`;
