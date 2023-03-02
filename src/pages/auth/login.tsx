import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

import { Avatar } from "antd";
import { BiKey } from "react-icons/bi";
import { HiArrowSmLeft as BackIcon } from "react-icons/hi";
import { Formik, Form, FormikValues } from "formik";

import * as yup from "yup";
import "yup-phone";

import Button from "@/components/shared/Button";
import ButtonGoogle from "@/components/shared/ButtonGoogle";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import InputPassword from "@/components/form/InputPassword";
import Topbar from "@/components/layouts/partials/Topbar";

import { login } from "@/utils/auth";

interface InputFields {
	label: string;
	name: string;
	type: string;
	prefix?: JSX.Element;
	suffix?: JSX.Element;
}

const LoginPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleRoute = (url: string) => Router.push(url);

	const initialValues = {
		phone: "",
		password: "",
	};

	const validationSchema = yup.object({
		// phone: yup
		//   .string()
		//   .phone("ID", true, "Nomor HP tidak valid")
		//   .required("Nomor HP wajib diisi"),
		password: yup
			.string()
			.min(5, "Password minimal 5 karakter")
			.required("Password wajib diisi"),
	});

	const onSubmit = (values: FormikValues) => {
		setLoading(true);
		console.log("onSubmit => ", values);

		setTimeout(() => {
			if (values.phone == "8122244054" && values.password === "aulianza") {
				const token = "YXVsaWFuemE=";
				login({ token });
			} else {
				console.log("password salah");
				toast.error("Nomor HP atau Password salah");
			}
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	const inputForm: InputFields[] = [
		{
			label: "Nomor HP atau Email",
			name: "text",
			type: "text",
			// prefix: (
			// 	<>
			// 		<Image src="/images/id-flag.svg" width={20} height={15} alt="id" />
			// 		&nbsp; +62
			// 	</>
			// ),
		},
		{
			label: "Password",
			name: "password",
			type: "password",
			prefix: <BiKey size="20" />,
		},
	];

	return (
		<>
			<Head>
				<title>Login - Invityu</title>
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
					<Image
						src="/images/illustrations/login.svg"
						width={100}
						height={100}
						alt="login-icon"
						className="mb-3"
					/>
					<h1 className="text-2xl font-medium  mt-2">Masuk</h1>
					<span className="text-gray-500">
						Masuk ke akunmu untuk melanjutkan
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
								{inputForm.map((field, key) => (
									<div key={key}>
										{field.type !== "password" && (
											<Input
												label={field.label}
												name={field.name}
												type={field.type}
												prefix={field.prefix}
												suffix={field.suffix}
											/>
										)}
										{field.type === "password" && (
											<InputPassword
												label={field.label}
												name={field.name}
												type={field.type}
												prefix={field.prefix}
												suffix={field.suffix}
											/>
										)}
									</div>
								))}
								<div
									className="text-right text-primary cursor-pointer"
									onClick={() => handleRoute("/auth/forgot-password")}
								>
									Lupa Password?
								</div>
								{/* <pre>{JSON.stringify(formik, null, 4)}</pre> */}

								<div className="my-8 space-y-6">
									<Button
										type="submit"
										isDisabled={!(formik.isValid && formik.dirty)}
										isBlock
										isLoading={isLoading}
									>
										Masuk
									</Button>
									<div className="flex justify-center items-center gap-5 w-full">
										<div className="border-t border-primary-100 w-full"></div>
										<div className="text-gray-500">atau</div>
										<div className="border-t border-primary-100 w-full"></div>
									</div>
									<ButtonGoogle type="button" isBlock isLoading={isLoading}>
										Lanjutkan dengan Google
									</ButtonGoogle>
								</div>

								<div className="flex justify-center gap-2 mt-10">
									Belum punya akun?{" "}
									<div
										className="text-right text-primary font-medium cursor-pointer"
										onClick={() => handleRoute("/auth/register")}
									>
										{" "}
										Daftar yuk!
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Container>
		</>
	);
};

export default LoginPage;

const StyledBack = styled(Avatar)`
	box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
	cursor: pointer;
`;
