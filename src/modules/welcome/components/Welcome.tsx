import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import styled from "@emotion/styled";

import Button from "@/common/components/elements/Button";
import Image from "@/common/components/elements/Image";

const Welcome: React.FC = () => {
	const handleRoute = (url: string) => Router.push(url);

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	return (
		<StyledWalkthrough>
			<StyledTopContainer>
				<StyledCentered>
					<Image
						src="/images/illustrations/welcome-page.svg"
						width={220}
						height={220}
						alt="welcome"
						loading="eager"
						priority
					/>
				</StyledCentered>
			</StyledTopContainer>
			<StyledMiddleContainer />
			<StyledBottomContainer>
				<StyledCentered className="px-8">
					<div className="px-8 my-5 space-y-3">
						<h1 className="text-primary-600 font-medium font-modernist text-2xl">
							invityu
						</h1>
						<p className="font-normal text-gray-500">
							Buat undangan digital untuk beragam kebutuhan acaramu
						</p>
					</div>
					<div className="my-8">
						<Button
							className="mb-4"
							isBlock
							onClick={() => handleRoute("/auth/register")}
						>
							Buat Akun
						</Button>
						<Button
							isBlock
							bgColor="#EBF2FC"
							textColor="#556DC2"
							borderColor="#C7D7FF"
							onClick={() => handleRoute("/auth/login")}
						>
							Login
						</Button>
					</div>
				</StyledCentered>
			</StyledBottomContainer>
		</StyledWalkthrough>
	);
};

export default Welcome;

const StyledWalkthrough = styled.div`
	background-color: #fff;
	height: 100vh;

	> div {
		overflow: hidden;
		width: 100%;
		max-width: 480px;
		position: fixed;
		z-index: 1;
	}
`;

const StyledTopContainer = styled.div`
	background-color: #ebf2fc;
	height: 50%;
	top: 0;
`;

const StyledMiddleContainer = styled.div`
	height: 5%;
	top: 50%;
	background-color: #ebf2fc;
	border-bottom-right-radius: 50%;
	border-bottom-left-radius: 50%;
`;

const StyledBottomContainer = styled.div`
	background-color: #fff;
	height: 45%;
	top: 55%;
`;

const StyledCentered = styled.div`
	width: 100%;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	div {
		text-align: -webkit-center;
	}
`;
