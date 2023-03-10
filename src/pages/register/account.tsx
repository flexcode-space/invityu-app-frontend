import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { BiKey, BiUser } from "react-icons/bi";
import { Formik, Form, FormikValues } from "formik";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { NextSeo } from "next-seo";

import * as yup from "yup";

import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import Image from "@/components/shared/Image";
import PageHeading from "@/components/layouts/partials/auth/PageHeading";

import { InputProps } from "@/components/form/type";
import { StyledAuthPage } from "@/styles/auth";

const RegisterAccountPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);

	const [usernameValue, setUsernameValue] = useState<any>(
		"aulianza@icloud.com"
	);
	const [usernameInputType, setUsernameInputType] = useState<string>("text");
	const [usernameInputPrefix, setUsernameInputPrefix] =
		useState<JSX.Element | null>(null);

	const initialValues = {
		username: usernameValue,
		password: null,
		name: null,
	};

	const inputForm: InputProps[] = [
		{
			label: usernameInputType === "email" ? "Email" : "Nomor HP",
			name: "username",
			type: usernameInputType,
			prefix: <>{usernameInputPrefix}</>,
			isReadOnly: true,
			value: usernameValue,
		},
		{
			label: "Nama Kamu",
			name: "name",
			type: "text",
			prefix: <BiUser size="20" />,
		},
		{
			label: "Kata Sandi",
			name: "password",
			type: "password",
			prefix: <BiKey size="20" />,
		},
		{
			label: "Konfirmasi Kata Sandi",
			name: "cpassword",
			type: "password",
			prefix: <BiKey size="20" />,
		},
	];

	const validationSchema = yup.object().shape({
		name: yup.string().required("Nama wajib diisi"),
		password: yup
			.string()
			.min(5, "Password minimal 5 karakter")
			.required("Password wajib diisi"),
		cpassword: yup
			.string()
			.oneOf([yup.ref("password"), undefined], "Password tidak sama"),
	});

	const onSubmit = (values: FormikValues) => {
		setLoading(true);
		console.log("onSubmit => ", values);

		setTimeout(() => {
			if (values) {
				toast.success("Data berhasil disimpan");
				Router.push("/dashboard");
				setLoading(false);
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

	return (
		<>
			<NextSeo
				title="Buat Kata Sandi - Invityu"
				description="Selamat Datang di Invityu"
				themeColor="#ffffff"
			/>
			<StyledAuthPage>
				<Container>
					<PageHeading
						title="Buat Kata Sandi"
						description="Kata sandi digunakan untuk meningkatkan keamanan transaksi"
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
											<Input
												label={item?.label}
												name={item?.name}
												type={item?.type}
												prefix={item?.prefix}
												suffix={item?.suffix}
												isReadOnly={item?.isReadOnly}
												value={item?.value}
											/>
										</div>
									))}

									<div className="my-8 space-y-6">
										<Button
											type="submit"
											isDisabled={!(formik.isValid && formik.dirty)}
											isBlock
											isLoading={isLoading}
										>
											Simpan & Lanjutkan
										</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</Container>
			</StyledAuthPage>
		</>
	);
};

export default RegisterAccountPage;
