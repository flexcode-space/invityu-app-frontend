import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import OtpInput from "react-otp-input";
import Router from "next/router";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

import BackButton from "@/common/components/elements/BackButton";
import Button from "@/common/components/elements/Button";
import Container from "@/common/components/elements/Container";
import Loading from "@/common/components/elements/Loading";
import PageHeading from "@/common/components/layouts/partials/auth/PageHeading";

import { StyledAuthPage } from "@/common/styles/auth";
import { onErrorHandling } from "@/common/helpers/error";

import useAuthTempData from "@/common/hooks/useAuthTempData";
import { usePostOtpResend, usePostOtpVerify } from "../hooks";

const VerifyOTP: React.FC = () => {
	const [otp, setOtp] = useState<string>("");
	const [isCountdown, setIsCountdown] = useState<boolean>(true);
	const [isFilled, setFilled] = useState<boolean>(false);

	const { authTempData, loading } = useAuthTempData();

	const source = authTempData?.source;
	const backUrl = source === "register" ? "/auth/register" : "/";

	const { mutate: mutateOtpVerify, isLoading } = usePostOtpVerify();
	const { mutate: mutateOtpResend } = usePostOtpResend();

	const initialPayload = useMemo(
		() => ({
			username: authTempData?.username,
			type: authTempData?.type,
			source: authTempData?.source,
		}),
		[authTempData]
	);

	const handleChange = (otp: string) => {
		setOtp(otp);
		if (otp.length === 4) {
			setFilled(true);
			console.log("otp => ", otp);
		} else {
			setFilled(false);
		}
	};

	const handleSubmit = () => {
		handleVerifyOtp();
	};

	const handleVerifyOtp = () => {
		const payload = {
			...initialPayload,
			otp,
		};

		try {
			mutateOtpVerify(payload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.status) {
						toast.success("Kode verifikasi valid");

						const token = res?.data?.data?.token;
						Cookies.set("tokenTemp", token, { expires: 30 });

						if (source === "register") {
							Router.push("/register/complete");
						} else if (source === "forgot-password") {
							Router.push("/auth/new-password");
						}
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
	};

	const handleResendOtp = useCallback(async () => {
		setOtp("");

		try {
			mutateOtpResend(initialPayload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.Status) {
						toast.success("Kode verifikasi telah dikirim");
						setIsCountdown(true);
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
	}, [initialPayload, mutateOtpResend]);

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	// useEffect(() => {
	// 	if (Cookies.get("token")) {
	// 		Router.push("/dashboard");
	// 	} else if (Cookies.get("tokenTemp")) {
	// 		Router.push("/");
	// 	}
	// }, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			{authTempData && (
				<StyledAuthPage>
					<Container>
						<BackButton route={backUrl} />
						<PageHeading
							title="Kode Verifikasi"
							description={`Masukkan kode verifikasi yang telah dikirim melalui ${
								authTempData?.type === "email" ? "email" : "WhatsApp"
							} :`}
							verificationType={authTempData?.type}
							username={authTempData?.username}
							style={{ marginBottom: "1.5rem" }}
						/>
						<StyledOtpField>
							<StyledInput
								value={otp}
								onChange={handleChange}
								numInputs={4}
								separator={<span></span>}
								isInputNum
								shouldAutoFocus={true}
							/>
						</StyledOtpField>
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
						<div className="text-center text-gray-500">
							Tidak menerima kode verifikasi?{" "}
							<MemoizedVerificationCountdown
								isCountdown={isCountdown}
								setIsCountdown={setIsCountdown}
								handleResendOtp={handleResendOtp}
							/>
						</div>
					</Container>
				</StyledAuthPage>
			)}
		</>
	);
};

export default VerifyOTP;

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
	padding: 1rem 0;

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
		border: 2px solid #ebf2fc;
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
