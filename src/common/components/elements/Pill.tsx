import React from "react";

type PillProps = {
	label: string;
	active?: boolean;
	onClick?: () => void;
};

const Pill: React.FC<PillProps> = ({ label, active = false, onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<div
			className={`px-4 py-2 rounded-full cursor-pointer ${
				active ? "bg-secondary-400 text-white" : "bg-white text-secondary-400"
			}`}
			onClick={handleClick}
		>
			{label}
		</div>
	);
};

export default Pill;
