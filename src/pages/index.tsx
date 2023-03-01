import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Head from "next/head";
import Router from "next/router";

import styled from "@emotion/styled";
import Button from "@/components/shared/Button";

export default function Home() {
	const handleRoute = (url: string) => Router.push(url);

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	return (
		<>
			<Head>
				<title>Selamat Datang - Invityu</title>
			</Head>
			<div className="h-screen overflow-hidden">
				<div className="flex w-full justify-center items-center h-full bg-primary-600">
					<Image
						src="/images/illustrations/welcome.svg"
						alt={"welcome"}
						width={350}
						height={300}
						className="pb-[320px] p-3"
					/>
				</div>
				<StyledFormContainer>
					<div className="p-4 space-y-8 text-center">
						<div className="space-y-3">
							<h1 className="text-xl font-medium">
								Selamat datang di Invityu!
							</h1>
							<p className="text-base font-normal mb-1 sm:mb-5 text-gray-700">
								Buat undangan digital untuk beragam kebutuhan acaramu
							</p>
						</div>
						<div className="flex flex-col space-y-4">
							<Button isBlock onClick={() => handleRoute("/auth/register")}>
								Belum punya akun ? Daftar yuk!
							</Button>
							<Button
								isOutline
								isBlock
								onClick={() => handleRoute("/auth/login")}
							>
								Masuk
							</Button>
						</div>
					</div>
				</StyledFormContainer>
			</div>
		</>
	);
}

const StyledFormContainer = styled.div`
	z-index: 3;
	position: relative;
	background-color: #fff;
	padding: 1rem 0.7rem 2rem;
	/* margin-top: -50px; */
	box-shadow: rgb(108 114 124 / 10%) 0px -1px 4px 0px;
	border-top-left-radius: 1.2rem;
	border-top-right-radius: 1.2rem;

	position: fixed;
	transition-duration: 500ms;
	width: 100%;
	height: auto;
	bottom: 0px;
	left: 0px;
	right: 0px;
	max-width: 480px;
	margin: 0px auto;
`;
