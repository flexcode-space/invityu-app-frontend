import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import Router from "next/router";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

import { Avatar } from "antd";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { HiArrowSmLeft as BackIcon } from "react-icons/hi";
import { Formik, Field, Form, FormikValues } from "formik";

import * as yup from "yup";

import Button from "@/components/shared/Button";
import ButtonGoogle from "@/components/shared/ButtonGoogle";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import Topbar from "@/components/layouts/partials/Topbar";
import Image from "@/components/shared/Image";

interface InputFields {
	label: string;
	name: string;
	type: string;
	prefix?: JSX.Element;
	suffix?: JSX.Element;
}

const RegisterPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isGoogleLoading, setGoogleLoading] = useState<boolean>(false);

	const [usernameValue, setUsernameValue] = useState<any>(null);
	const [usernameInputType, setUsernameInputType] = useState<string>("text");
	const [usernameInputPrefix, setUsernameInputPrefix] =
		useState<JSX.Element | null>(null);

	const handleRoute = (url: string) => Router.push(url);

	const initialValues = {
		username: null,
	};

	const handleUsernameChange = (
		setFieldValue: FormikValues["setFieldValue"],
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value;
		setFieldValue("username", value);
		setUsernameValue(value);
	};

	const validationSchema = yup.object().shape({
		username: yup
			.string()
			.required("Nomor HP atau Email wajib diisi")
			.test(
				"phone-or-email",
				"Harap masukkan nomor HP atau email yang valid",
				function (value) {
					if (!value) return false;
					const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
					const phoneRegex = /^(^\+62\s?|^8)(\d{3,4}-?){2}\d{3,4}$/;
					return emailRegex.test(value) || phoneRegex.test(value);
				}
			),
	});

	const onSubmit = (values: FormikValues) => {
		setLoading(true);
		console.log("onSubmit => ", values);

		setTimeout(() => {
			if (values) {
				toast.success("Pendaftaran berhasil");
				console.log("success, redirect to OTP");
			} else {
				console.log("register gagal");
				toast.error("Pendaftaran Gagal");
			}
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	useEffect(() => {
		if (!usernameValue) {
			setUsernameInputType("text");
			setUsernameInputPrefix(<></>);
			return;
		}

		setUsernameInputType(isNaN(usernameValue) ? "email" : "phone");
		setUsernameInputPrefix(
			isNaN(usernameValue) ? (
				<EmailIcon size="20" />
			) : (
				<>
					<Image src="/images/id-flag.svg" width={20} height={15} alt="id" />
					&nbsp; +62
				</>
			)
		);
	}, [usernameValue]);

	const inputForm: InputFields[] = [
		{
			label: "Nomor HP atau Email",
			name: "username",
			type: usernameInputType,
			prefix: <>{usernameInputPrefix}</>,
		},
	];

	return (
		<>
			<Head>
				<title>Register - Invityu</title>
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<Topbar>
				<StyledBack
					onClick={() => Router.push("/")}
					className="mr-3 text-white bg-primary-600"
				>
					<BackIcon size="22" className="mt-1" style={{ marginRight: "1px" }} />
				</StyledBack>
			</Topbar>
			<Container>
				<div className="flex flex-col items-center justify-center mt-5 mb-10 space-y-2">
					<h1 className="text-2xl font-medium  mt-2">Daftar</h1>
					<span className="text-gray-500">
						Daftarkan akunmu untuk melanjutkan
					</span>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<Form className="mb-10">
								{inputForm.map((item, key) => (
									<div key={key}>
										<Field name={item?.name}>
											{({ field, form }: { field: any; form: any }) => (
												<Input
													label={item?.label}
													name={item?.name}
													type={item?.type}
													prefix={item?.prefix}
													suffix={item?.suffix}
													onChange={(
														event: React.ChangeEvent<HTMLInputElement>
													) => handleUsernameChange(form.setFieldValue, event)}
												/>
											)}
										</Field>
									</div>
								))}
								{/* <pre>{JSON.stringify(formik, null, 4)}</pre> */}

								<div className="my-8 space-y-6">
									<Button
										type="submit"
										isDisabled={!(formik.isValid && formik.dirty)}
										isBlock
										isLoading={isLoading}
									>
										Daftar
									</Button>
									<div className="flex justify-center items-center gap-5 w-full">
										<div className="border-t border-primary-100 w-full"></div>
										<div className="text-gray-500">atau</div>
										<div className="border-t border-primary-100 w-full"></div>
									</div>
									<ButtonGoogle
										type="button"
										isBlock
										isLoading={isGoogleLoading}
									>
										Lanjutkan dengan Google
									</ButtonGoogle>
								</div>

								<div className="flex justify-center gap-2 mt-10">
									Sudah punya akun?{" "}
									<div
										className=" text-primary font-medium cursor-pointer"
										onClick={() => handleRoute("/auth/login")}
									>
										{" "}
										Masuk
									</div>
								</div>

								<div className="text-center text-sm text-gray-500 mt-12">
									Dengan mendaftar, saya menyetujui{" "}
									<span
										className=" text-primary-600 font-medium cursor-pointer"
										onClick={() => handleRoute("/terms")}
									>
										Syarat dan Ketentuan
									</span>{" "}
									serta{" "}
									<span
										className=" text-primary-600 font-medium cursor-pointer"
										onClick={() => handleRoute("/privacy")}
									>
										Kebijakan Privasi
									</span>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Container>
		</>
	);
};

export default RegisterPage;

const StyledBack = styled(Avatar)`
	box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
	cursor: pointer;
`;
