import React, { useState } from "react";
import clsx from "clsx";
import { Interfaces } from "doodle-icons";

interface Props {
	url: string;
}

const EmbeddedWebsite: React.FC<Props> = ({ url }) => {
	const [isLoading, setLoading] = useState<boolean>(true);

	const handleOnload = () => setLoading(false);

	return (
		<>
			{isLoading && (
				<div
					className={clsx(
						"absolute inset-0 bg-primary-50",
						"flex flex-col justify-center items-center gap-10",
						"text-brand max-w-[480px] m-auto overflow-hidden"
					)}
				>
					<Interfaces.Zap
						width={50}
						className="z-10 animate-pulse "
						fill="text-gray-800"
					/>
					<span className="text-lg text-gray-800">Loading Preview</span>
				</div>
			)}
			<iframe
				className="inset-0 w-full h-screen"
				src={url}
				title="Embedded Website"
				allowFullScreen
				onLoad={handleOnload}
			/>
		</>
	);
};

export default EmbeddedWebsite;
