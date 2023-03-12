import React, { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	[propName: string]: any;
};

const Container = ({ children, ...others }: ContainerProps) => {
	return (
		<div className="p-8" {...others}>
			{children}
		</div>
	);
};

export default Container;
