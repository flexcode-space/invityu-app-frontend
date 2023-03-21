import React, { FC } from "react";
import styled from "@emotion/styled";

const Loading: FC = () => {
	return (
		<Overlay>
			<LoaderWrapper>
				<LoaderIcon />
			</LoaderWrapper>
		</Overlay>
	);
};

export default Loading;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
`;

const LoaderWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const LoaderIcon = styled.div`
	border: 4px solid #556dc2;
	border-top: 4px solid transparent;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	animation: spin 1s ease-in-out infinite;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
