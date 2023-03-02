import React from "react";

interface Props {
	title: string;
	description: string;
	verificationType?: string | string[] | null;
	username?: string;
	style?: React.CSSProperties;
	[key: string]: any;
}

const PageHeading: React.FC<Props> = ({
	title,
	description,
	verificationType,
	username,
	style,
	...others
}) => {
	return (
		<div
			className="flex flex-col items-center justify-center text-center mt-5 mb-10 space-y-2"
			style={style}
			{...others}
		>
			<h1 className="text-2xl font-medium mt-2">{title}</h1>
			<div className="text-gray-500">
				{description}
				{username && (
					<span className="text-primary">
						{" "}
						{verificationType === "phone" && "+62"}
						{username}
					</span>
				)}
			</div>
		</div>
	);
};

export default PageHeading;
