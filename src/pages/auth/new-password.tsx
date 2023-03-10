import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { BiKey } from "react-icons/bi";
import { Formik, Form, FormikValues } from "formik";
import { NextSeo } from "next-seo";

import * as yup from "yup";

import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import Input from "@/components/form/Input";
import PageHeading from "@/components/layouts/partials/auth/PageHeading";

import { InputProps } from "@/components/form/type";
import { StyledAuthPage } from "@/styles/auth";

const NewPasswordPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);

	const initialValues = {
		password: null,
	};

	const inputForm: InputProps[] = [
		{
			label: "Kata Sandi Baru",
			name: "npassword",
			type: "password",
			prefix: <BiKey size="20" />,
		},
		{
			label: "Konfirmasi Kata Sandi Baru",
			name: "cnpassword",
			type: "password",
			prefix: <BiKey size="20" />,
		},
	];

	const validationSchema = yup.object().shape({
		npassword: yup
			.string()
			.min(5, "Password minimal 5 karakter")
			.required("Password wajib diisi"),
		cnpassword: yup
			.string()
			.oneOf([yup.ref("npassword"), undefined], "Password tidak sama"),
	});

	const onSubmit = (values: FormikValues) => {
		setLoading(true);
		console.log("onSubmit => ", values);

		setTimeout(() => {
			if (values) {
				toast.success("Kata Sandi baru berhasil disimpan");
				Router.push("/dashboard");
				setLoading(false);
			} else {
				console.log("reset password gagal");
				toast.error("Reset Kata Sandi Gagal");
			}
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		Cookies.get("token") && Router.push("/dashboard");
	}, []);

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
						title="Atur Kata Sandi Baru"
						description="Atur ulang kata sandi baru kami disini"
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

export default NewPasswordPage;
