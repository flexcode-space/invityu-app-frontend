import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { Formik, Field, Form, FormikValues } from "formik";

import * as yup from "yup";

import Button from "@/common/components/elements/Button";
import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import Input from "@/common/components/form/Input";
import Image from "@/common/components/elements/Image";
import PageHeading from "@/common/components/layouts/partials/auth/PageHeading";

import { InputProps } from "@/common/components/form/type";
import { StyledAuthPage } from "@/common/styles/auth";
import { onErrorHandling } from "@/common/helpers/error";

import { usePostAccountCheck } from "../hooks";

const ForgotPassword: React.FC = () => {
	const [usernameValue, setUsernameValue] = useState<any>(null);
	const [usernameInputType, setUsernameInputType] = useState<string>("text");
	const [usernameInputPrefix, setUsernameInputPrefix] =
		useState<JSX.Element | null>(null);

	const { mutate, isLoading } = usePostAccountCheck();

	const initialValues = {
		username: null,
	};

	const inputForm: InputProps[] = [
		{
			label: "Nomor HP atau Email",
			name: "username",
			type: usernameInputType,
			prefix: <>{usernameInputPrefix}</>,
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
	});

	const onSubmit = (values: FormikValues) => {
		console.log("onSubmit => ", values);

		const payload = {
			username: values?.username,
			type: usernameInputType,
		};

		try {
			mutate(payload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.status) {
						toast.success("Kode verifikasi berhasil dikirim");

						const storeTempAuth = res?.data?.data || {};
						Cookies.set("authTemp", JSON.stringify(storeTempAuth));

						Router.push("/auth/verify");
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
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
		<StyledAuthPage>
			<Container>
				<BackButton route="/" />
				<PageHeading
					title="Lupa Kata Sandi?"
					description="Masukkan nomor HP atau email yang terdaftar"
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
								<div className="my-8 space-y-6">
									<Button
										type="submit"
										isDisabled={!(formik.isValid && formik.dirty)}
										isBlock
										isLoading={isLoading}
									>
										Selanjutnya
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

export default ForgotPassword;
