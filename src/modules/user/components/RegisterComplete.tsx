import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

import { BiKey, BiUser } from "react-icons/bi";
import { Formik, Form, FormikValues } from "formik";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";

import * as yup from "yup";

import Button from "@/common/components/elements/Button";
import Container from "@/common/components/elements/Container";
import Input from "@/common/components/form/Input";
import Image from "@/common/components/elements/Image";
import Loading from "@/common/components/elements/Loading";
import PageHeading from "@/common/components/layouts/partials/auth/PageHeading";

import { InputProps } from "@/common/components/form/type";
import { StyledAuthPage } from "@/common/styles/auth";
import { onErrorHandling } from "@/common/helpers/error";

import useAuthTempData from "@/common/hooks/useAuthTempData";
import { usePostRegisterComplete } from "../hooks";

const RegisterComplete: React.FC = () => {
	const [usernameInputType, setUsernameInputType] = useState<string>("text");
	const [usernameInputPrefix, setUsernameInputPrefix] =
		useState<JSX.Element | null>(null);

	const { authTempData, loading } = useAuthTempData();
	const { mutate, isLoading } = usePostRegisterComplete();

	const initialValues = {
		username: authTempData?.username,
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
			value: authTempData?.username,
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
		password: yup
			.string()
			.min(5, "Password minimal 5 karakter")
			.required("Password wajib diisi"),
		cpassword: yup
			.string()
			.oneOf([yup.ref("password"), undefined], "Password tidak sama"),
	});

	const onSubmit = (values: FormikValues) => {
		const payload = {
			password: values?.password,
			type: usernameInputType,
			source: "register",
		};

		try {
			mutate(payload, {
				onSuccess: (res) => {
					console.log("res:", res);
					if (res?.data?.status) {
						toast.success("Data berhasil disimpan");

						// TODO: remove tokenTemp cookies and set token cookies, then redirect to dashboard

						// Router.push("/dashboard");
					}
				},
				onError: (error) => onErrorHandling(error),
			});
		} catch (error) {
			toast.error("Unexpected error occurred!");
		}
	};

	useEffect(() => {
		if (!authTempData?.username) {
			setUsernameInputType("text");
			setUsernameInputPrefix(<></>);
			return;
		}

		setUsernameInputType(isNaN(authTempData?.username) ? "email" : "phone");
		setUsernameInputPrefix(
			isNaN(authTempData?.username) ? (
				<EmailIcon size="20" />
			) : (
				<>
					<Image src="/images/id-flag.svg" width={20} height={15} alt="id" />
					&nbsp; +62
				</>
			)
		);
	}, [authTempData?.username]);

	// useEffect(() => {
	// 	if (Cookies.get("token")) {
	// 		Router.push("/dashboard");
	// 	} else if (Cookies.get("tokenTemp")) {
	// 		Router.push("/");
	// 	}
	// }, []);

	// useEffect(() => {
	// 	Cookies.get("tokenTemp") === undefined && Router.push("/");
	// }, []);

	if (loading) {
		return <Loading />;
	}

	return (
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
	);
};

export default RegisterComplete;
