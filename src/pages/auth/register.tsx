import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { Formik, Field, Form, FormikValues } from "formik";
import { NextSeo } from "next-seo";

import * as yup from "yup";

import Button from "@/components/shared/Button";
import BackButton from "@/components/shared/BackButton";
import ButtonGoogle from "@/components/shared/ButtonGoogle";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import Image from "@/components/shared/Image";
import PageHeading from "@/components/layouts/partials/auth/PageHeading";
import Topbar from "@/components/layouts/partials/Topbar";

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
		let value = event.target.value;
		value = event.target.value.replace(/^0+/, "").toLowerCase();
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
				// toast.success("Kode verifikasi berhasil dikirim");
				Router.push({
					pathname: "/auth/verify",
					query: {
						token: randomString(64),
						ref: btoa(values?.username),
						type: usernameInputType,
						source: "register",
					},
				});
				setLoading(false);
			} else {
				console.log("register gagal");
				toast.error("Pendaftaran Gagal");
			}
			setLoading(false);
		}, 1000);
	};

	const randomString = (length: number) => {
		const chars =
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let result = "";
		for (let i = length; i > 0; --i)
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
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
			<NextSeo
				title="Daftar - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#ffffff"
			/>
			<Topbar>
				<BackButton route="/" />
			</Topbar>
			<Container>
				<PageHeading
					title="Daftar"
					description="Daftarkan akunmu untuk melanjutkan"
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
