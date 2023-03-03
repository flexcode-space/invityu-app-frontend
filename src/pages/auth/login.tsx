import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { BiKey } from "react-icons/bi";
import { Formik, Field, Form, FormikValues } from "formik";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { NextSeo } from "next-seo";

import * as yup from "yup";

import Button from "@/components/shared/Button";
import BackButton from "@/components/shared/BackButton";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import Image from "@/components/shared/Image";
import PageHeading from "@/components/layouts/partials/auth/PageHeading";
import Topbar from "@/components/layouts/partials/Topbar";
import SSOLogin from "@/components/auth/SSOLogin";

import { login } from "@/utils/auth";

import { InputProps } from "@/components/form/type";
import { SSOCallbackResponseProps } from "@/components/auth/type";
import { ssoProviders } from "@/constant/ssoProviders";

const LoginPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isGoogleLoading, setGoogleLoading] = useState<boolean>(false);

	const [usernameValue, setUsernameValue] = useState<any>(null);
	const [usernameInputType, setUsernameInputType] = useState<string>("text");
	const [usernameInputPrefix, setUsernameInputPrefix] =
		useState<JSX.Element | null>(null);

	const activeSSOProvider = ssoProviders.find((provider) => provider.is_active);
	const handleRoute = (url: string) => Router.push(url);

	const initialValues = {
		username: null,
		password: null,
	};

	const inputForm: InputProps[] = [
		{
			label: "Nomor HP atau Email",
			name: "username",
			type: usernameInputType,
			prefix: <>{usernameInputPrefix}</>,
		},
		{
			label: "Kata Sandi",
			name: "password",
			type: "password",
			prefix: <BiKey size="20" />,
		},
	];

	const handleUsernameChange = useCallback(
		(
			setFieldValue: FormikValues["setFieldValue"],
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			let value = event.target.value;
			value = event.target.value.replace(/^0+/, "").toLowerCase();
			setFieldValue("username", value);
			setUsernameValue(value);
		},
		[]
	);

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
		password: yup
			.string()
			.min(5, "Password minimal 5 karakter")
			.required("Password wajib diisi"),
	});

	const onSubmit = (values: FormikValues) => {
		setLoading(true);
		console.log("onSubmit => ", values);

		setTimeout(() => {
			if (values?.username == "8122244054" && values?.password === "aulianza") {
				const token = "YXVsaWFuemE=";
				login({ token });
			} else {
				console.log("password salah");
				toast.error(
					`${
						usernameInputType === "email" ? "Email" : "Nomor HP"
					} atau Password salah`
				);
			}
			setLoading(false);
		}, 1000);
	};

	const handleSSOCallback = useCallback(
		async (response: SSOCallbackResponseProps): Promise<void> => {
			console.log("🚀 ~ file: login.tsx:98 ~ response:", response);
			// TODO: validate data to backend, and if valid set token and redirect to dashboard
		},
		[]
	);

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

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

	return (
		<>
			<NextSeo
				title="Masuk - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#ffffff"
			/>
			<Topbar>
				<BackButton route="/" />
			</Topbar>
			<Container>
				<PageHeading
					title="Masuk"
					description="Masuk ke akunmu untuk melanjutkan"
				/>
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
													) =>
														item?.name === "username" &&
														handleUsernameChange(form.setFieldValue, event)
													}
												/>
											)}
										</Field>
									</div>
								))}
								<div className="flex justify-end">
									<div
										className="text-right text-primary cursor-pointer"
										onClick={() => handleRoute("/auth/forgot-password")}
									>
										Lupa Password?
									</div>
								</div>

								<div className="my-8 space-y-6">
									<Button
										type="submit"
										isDisabled={!(formik.isValid && formik.dirty)}
										isBlock
										isLoading={isLoading}
									>
										Masuk
									</Button>
									{activeSSOProvider && (
										<div
											className="flex justify-center items-center gap-5 w-full"
											data-aos="flip-up"
										>
											<div className="border-t border-primary-100 w-full"></div>
											<div className="text-gray-500">atau</div>
											<div className="border-t border-primary-100 w-full"></div>
										</div>
									)}
									<div className="flex flex-col space-y-4">
										<SSOLogin
											callback={(response: SSOCallbackResponseProps) =>
												handleSSOCallback(response)
											}
											isLoading={isGoogleLoading}
										/>
									</div>
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
