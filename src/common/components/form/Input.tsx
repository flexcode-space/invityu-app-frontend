import React from 'react';
import FormikErrorMessage from './FormikErrorMessage';
import { FieldProps, Field } from 'formik';

import { InputProps } from './type';
import { StyledInput, StyledInputPassword } from './style';

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
  const Component = type === 'password' ? StyledInputPassword : StyledInput;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="mb-3" {...others}>
          <label htmlFor={name} className="block text-gray-500 text-[14px]">
            {label}
            {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
          </label>
          <Component
            title={name}
            type={type}
            placeholder={placeholder}
            defaultChecked={field.value}
            prefix={prefix}
            suffix={suffix}
            defaultValue={value}
            readOnly={isReadOnly}
            {...field}
          />
          <FormikErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
};

export default Input;
