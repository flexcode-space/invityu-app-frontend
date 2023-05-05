import React, { FC } from 'react';
import FormikErrorMessage from './FormikErrorMessage';
import { FieldProps, Field } from 'formik';

import { InputProps } from './type';
import { StyledInput, StyledInputPassword } from './style';

const Input: FC<InputProps> = ({
  name,
  type,
  label,
  note,
  placeholder,
  prefix,
  suffix,
  value,
  required,
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
            {required && <span className="text-red-500 text-xs"> *</span>}
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
            min={type === 'number' ? 0 : undefined}
            {...field}
          />
          <FormikErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
};

export default Input;
