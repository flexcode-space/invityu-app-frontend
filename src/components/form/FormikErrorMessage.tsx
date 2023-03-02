import React from "react";
import { ErrorMessage } from "formik";

interface Props {
	name: string;
}

const FormikErrorMessage: React.FC<Props> = ({ name }) => {
	return (
		<ErrorMessage name={name}>
			{(errMessage) => {
				return <div className="text-red-500 text-xs mb-5">{errMessage}</div>;
			}}
		</ErrorMessage>
	);
};

export default FormikErrorMessage;
