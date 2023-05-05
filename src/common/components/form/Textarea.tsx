import React, { FC } from 'react';
import FormikErrorMessage from './FormikErrorMessage';
import { FieldProps, Field } from 'formik';

import { InputProps } from './type';
import { Input } from 'antd';
import { baseInputStyles } from './style';
import styled from '@emotion/styled';

const { TextArea } = Input;

interface TextAreaProps extends InputProps {
  rows?: number;
  autoSize?: boolean;
}

const Textarea: FC<TextAreaProps> = ({
  name,
  type,
  label,
  note,
  placeholder,
  value,
  required,
  isReadOnly,
  autoSize = false,
  rows = 3,
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="mb-3">
          <label htmlFor={name} className="block text-gray-500 text-[14px]">
            {label}
            {required && <span className="text-red-500 text-xs"> *</span>}
            {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
          </label>
          <StyledTextarea
            title={name}
            placeholder={placeholder}
            defaultValue={value}
            readOnly={isReadOnly}
            rows={rows}
            autoSize={autoSize}
            {...field}
          />
          <FormikErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
};

export default Textarea;

const StyledTextarea = styled(TextArea)`
  ${baseInputStyles}
`;
