import { Badge } from "antd";
import styled from "@emotion/styled";
import Image from "@/common/components/elements/Image";

import { tagColor } from "@/common/constant/color";
import { formatCurrency } from "@/common/helpers";
import { ThemeProps } from "@/common/types/themes";

const ThemeCard: React.FC<ThemeProps> = ({
	image,
	title,
	initial_price,
	price,
	tag,
}) => {
	const defaultTag = "Populer";

	const CardComponent = () => {
		return (
			<div className="w-full rounded-xl overflow-hidden shadow-sm border border-solid border-primary-50 cursor-pointer transition-all duration-300 hover:shadow-md">
				<Image src={image} width={300} height={300} alt={title} />
				<div className="p-4 space-y-1">
					<div className="font-medium">{title}</div>
					<div className="flex items-center gap-2">
						<p className="text-gray-600 text-sm font-medium">
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
		);
	};

	const CardWithRibbon = () => {
		return (
			<StyledRibbon text={tag} color={tagColor[tag ?? defaultTag]}>
				<CardComponent />
			</StyledRibbon>
		);
	};

	if (tag) {
		return <CardWithRibbon />;
	} else {
		return <CardComponent />;
	}
};

export default ThemeCard;

const StyledRibbon = styled(Badge.Ribbon)`
	font-size: 11px;
`;
