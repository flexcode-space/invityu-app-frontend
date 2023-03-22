import React, { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	className?: string;
	[propName: string]: any;
};

const Container = ({ children, className, ...others }: ContainerProps) => {
	return (
		<div className={`p-8 ${className}`} {...others}>
			{children}
		</div>
	);
};

export default Container;
