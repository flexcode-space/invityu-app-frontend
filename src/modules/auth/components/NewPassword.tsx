import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { BiKey } from "react-icons/bi";
import { Formik, Form, FormikValues } from "formik";

import * as yup from "yup";

import Button from "@/common/components/elements/Button";
import Container from "@/common/components/elements/Container";
import Input from "@/common/components/form/Input";
import PageHeading from "@/common/components/layouts/partials/auth/PageHeading";

import { InputProps } from "@/common/components/form/type";

import { StyledAuthPage } from "@/common/styles/auth";

import { usePostNewPassword } from "../hooks";
import { onErrorHandling } from "@/common/helpers/error";

const NewPassword: React.FC = () => {
	const { mutate, isLoading } = usePostNewPassword();

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
		const payload = {
			password: values?.npassword,
		};

		try {
			mutate(payload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.status) {
						toast.success("Kata Sandi baru berhasil disimpan");
						Cookies.remove("tokenTemp");
						Router.push("/auth/login");
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
	};

	useEffect(() => {
		const hasToken = Cookies.get("token");
		const hasTempToken = Cookies.get("tokenTemp");

		if (hasToken) {
			Router.push("/dashboard");
		} else if (!hasTempToken) {
			Router.push("/");
		}
	}, []);

	return (
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
	);
};

export default NewPassword;
