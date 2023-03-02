import React from "react";
import { FieldProps, Field } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";
import { Input as InputField } from "antd";
import styled from "@emotion/styled";

interface InputProps {
	name: string;
	type?: string;
	label?: string;
	note?: string;
	placeholder?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	value?: string;
	isReadOnly?: boolean;
	[key: string]: any;
}

const Input: React.FC<InputProps> = ({
	name,
	type,
	label,
	note,
	placeholder,
	prefix,
	suffix,
	value,
	isReadOnly,
	...others
}) => {
	return (
		<Field name={name}>
			{({ field }: FieldProps) => {
				return (
					<div className="mb-3" {...others}>
						<label htmlFor={name} className="block">
							{label}
							{note && (
								<span className="ml-1 text-red-500 text-xs">{note}</span>
							)}
						</label>
						<StyledInput
							title={name}
							type={type}
							// pattern={
							// 	name === "phone"
							// 		? "[0-9]*"
							// 		: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"
							// }
							placeholder={placeholder}
							defaultChecked={field.value}
							prefix={prefix}
							suffix={suffix}
							defaultValue={value}
							readOnly={isReadOnly}
							{...field}
						/>
						<FormikErrorMessage name={name} />
						{/* <pre>{JSON.stringify(formikField, null, 4)}</pre> */}
					</div>
				);
			}}
		</Field>
	);
};

export default Input;

const StyledInput = styled(InputField)`
	width: 100%;
	margin: 0.5rem 0;
	padding: 0.7rem;
	border: 2px solid #eee;
	border-radius: 15px;
	box-shadow: none !important;

	.ant-input-prefix {
		margin-right: ${(props: InputProps) =>
			props.name === "phone" ? "5px" : "10px"};
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
