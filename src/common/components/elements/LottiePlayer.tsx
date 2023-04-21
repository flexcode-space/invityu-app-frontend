import React, { FC } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

type LottiePlayerProps = {
	src: string;
	width?: string;
	height?: string;
};

const LottiePlayer: FC<LottiePlayerProps> = ({ src, width, height }) => {
	return (
		<Player
			autoplay
			loop
			src={src}
			style={{ height: height || "150px", width: width || "150px" }}
		></Player>
	);
};

export default LottiePlayer;
