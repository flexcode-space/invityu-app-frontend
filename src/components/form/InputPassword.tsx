import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { Input as InputField } from "antd";
import styled from "@emotion/styled";

interface InputPasswordProps {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
}

const InputPassword = ({
	name,
	type,
	label,
	placeholder,
	prefix,
	suffix,
}: InputPasswordProps) => {
	return (
		<Field name={name}>
			{({ field }: FieldProps) => {
				return (
					<div className="mb-3">
						<label htmlFor={name} className="block">
							{label}
						</label>
						<StyledInput
							type={type}
							placeholder={placeholder}
							defaultChecked={field.value}
							prefix={prefix}
							suffix={suffix}
							{...field}
						/>
						<ErrorMessage name={name}>
							{(errMessage) => {
								return (
									<div className="text-red-500 text-xs mb-5">{errMessage}</div>
								);
							}}
						</ErrorMessage>
					</div>
				);
			}}
		</Field>
	);
};

export default InputPassword;

const StyledInput = styled(InputField.Password)`
	width: 100%;
	margin: 0.5rem 0;
	padding: 0.7rem;
	border: 2px solid #eee;
	border-radius: 15px;
	box-shadow: none !important;

	.ant-input-prefix {
		margin-right: 10px;
	}

	&:hover {
		outline: none !important;
		border: 2px solid #b0c1ff !important;
	}

	&:focus {
		outline: none !important;
		border: 2px solid #b0c1ff !important;
	}
`;
