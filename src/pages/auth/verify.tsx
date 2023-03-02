import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import OtpInput from "react-otp-input";
import Router, { NextRouter, useRouter } from "next/router";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

import BackButton from "@/components/shared/BackButton";
import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import Head from "next/head";
import PageHeading from "@/components/layouts/partials/auth/PageHeading";
import Topbar from "@/components/layouts/partials/Topbar";

const VerifyPage = () => {
	const [otp, setOtp] = useState<string>("");
	const [isCountdown, setIsCountdown] = useState<boolean>(true);
	const [isFilled, setFilled] = useState<boolean>(false);
	const [isLoading, setLoading] = useState<boolean>(false);

	const router: NextRouter = useRouter();
	const username: string | null = router?.query?.ref
		? atob(router.query.ref as string)
		: null;
	const verificationType = router?.query?.type || null;
	const source = router?.query?.source || "register";
	const backUrl = source === "register" ? "/auth/register" : "/";

	const handleChange = (otp: string) => {
		setOtp(otp);
		console.log(otp);
		if (otp.length === 4) {
			setFilled(true);

			//TODO: do verify otp
			console.log("otp => ", otp);
		} else {
			setFilled(false);
		}
	};

	const handleSubmit = () => {
		setLoading(true);

		setTimeout(() => {
			if (otp === "1234") {
				toast.success("Kode verifikasi benar");
				// TODO: if forgot password, set new pass
				// TODO: if register, show alert phone number verified and back to login
				Router.push("/register/account");
				setLoading(false);
			} else {
				toast.error("Kode verifikasi salah");
				setLoading(false);
			}
		}, 1000);
	};

	const handleResendOtp = useCallback(async () => {
		console.log("resend otp");
		toast.success("Kode verifikasi telah dikirim");
		setIsCountdown(true);
	}, []);

	useEffect(() => {
		!username && Router.push(backUrl);
	}, [username, backUrl]);

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	return (
		<>
			{username && source && (
				<>
					<Head>
						<title>Verify - Invityu</title>
						<meta name="theme-color" content="#ffffff" />
					</Head>
					<Topbar>
						<BackButton route={backUrl} />
					</Topbar>
					<Container>
						<PageHeading
							title="Kode Verifikasi"
							description={`Masukkan kode verifikasi yang telah dikirim melalui ${
								verificationType === "email" ? "email" : "WhatsApp"
							} :`}
							verificationType={verificationType}
							username={username}
							style={{ marginBottom: "1.5rem" }}
						/>
						<StyledOtpField>
							<StyledInput
								value={otp}
								onChange={handleChange}
								numInputs={4}
								separator={<span></span>}
								isInputNum
							/>
							<div className="my-8">
								<Button
									type="button"
									onClick={handleSubmit}
									isDisabled={!isFilled}
									isLoading={isLoading}
									isBlock
								>
									Verifikasi
								</Button>
							</div>
						</StyledOtpField>
						<div className="text-center text-gray-500">
							Tidak menerima kode verifikasi?{" "}
							<MemoizedVerificationCountdown
								isCountdown={isCountdown}
								setIsCountdown={setIsCountdown}
								handleResendOtp={handleResendOtp}
							/>
						</div>
					</Container>
				</>
			)}
		</>
	);
};

export default VerifyPage;

interface VerificationCountDownProps {
	isCountdown: boolean;
	setIsCountdown: React.Dispatch<React.SetStateAction<boolean>>;
	handleResendOtp: () => void;
}

const VerificationCountDown: React.FC<VerificationCountDownProps> = ({
	isCountdown,
	setIsCountdown,
	handleResendOtp,
}) => {
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(59);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					setIsCountdown(false);
					clearInterval(myInterval);
					setSeconds(59);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	return isCountdown ? (
		<>
			<div className="text-center text-gray-500 px-0">
				Mohon tunggu{" "}
				<b className="text-primary font-medium">
					<span>
						{seconds < 10 ? `0${seconds.toString()}` : seconds.toString()} detik
					</span>
				</b>{" "}
				untuk kirim ulang
			</div>
		</>
	) : (
		<div
			className="w-full flex justify-center mx-0 md:mx-2 text-primary font-medium cursor-pointer"
			onClick={() => handleResendOtp()}
		>
			Kirim Ulang
		</div>
	);
};

const MemoizedVerificationCountdown = React.memo(VerificationCountDown);

const StyledOtpField = styled.div`
	div {
		justify-content: center;
		gap: 5px;
	}
`;

const StyledInput = styled(OtpInput)`
	input {
		width: 3rem !important;
		margin: 0.5rem 0;
		padding: 0.7rem;
		border: 2px solid #eee;
		border-radius: 10px;
		box-shadow: none !important;

		&:hover {
			outline: none !important;
			border: 2px solid #b0c1ff !important;
		}

		&:focus {
			outline: none !important;
			border: 2px solid #b0c1ff !important;
		}
	}

	span {
		margin: 0 0.5rem;
	}

	@media (max-width: 768px) {
		span {
			margin: 0 0.2rem;
		}
	}
`;
