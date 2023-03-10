import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";

import Button from "@/components/shared/Button";
import Image from "@/components/shared/Image";

export default function Home() {
	const handleRoute = (url: string) => Router.push(url);

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	return (
		<>
			<NextSeo
				title="Selamat Datang di Invityu - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#ebf2fc"
			/>
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
							<h1 className="text-primary-600 font-medium text-2xl">Invityu</h1>
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
								isOutline
								isBlock
								color="#C7D7FF"
								onClick={() => handleRoute("/auth/login")}
							>
								Login
							</Button>
						</div>
					</StyledCentered>
				</StyledBottomContainer>
			</StyledWalkthrough>
		</>
	);
}

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
