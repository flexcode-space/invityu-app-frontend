import React, { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	className?: string;
	isIncludePageHeader?: boolean;
	[propName: string]: any;
};

const Container = ({
	children,
	isIncludePageHeader = false,
	className,
	...others
}: ContainerProps) => {
	const paddingTop = "pt-24";

	return (
		<div
			className={`p-8 ${className} ${isIncludePageHeader && paddingTop}`}
			{...others}
		>
			{children}
		</div>
	);
};

export default Container;
