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
		<div className="flex flex-col my-10 space-y-2" style={style} {...others}>
			<h1 className="text-2xl text-primary-600 font-medium mt-2">{title}</h1>
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
