import React, { FC } from 'react';
import { Field } from 'formik';
import { DatePicker } from 'antd';
import styled from '@emotion/styled';

import { InputProps } from './type';
import { baseInputStyles } from './style';
import FormikErrorMessage from './FormikErrorMessage';

const Datepicker: FC<InputProps> = ({
  name,
  type,
  label,
  note,
  placeholder,
  prefix,
  suffix,
  value,
  isReadOnly,
  required = false,
  ...others
}) => {
  return (
    <div className="mb-3" {...others}>
      <label htmlFor={name} className="block text-gray-500 text-[14px]">
        {label}
        {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
      </label>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <DatePicker
            {...field}
            {...others}
            placeholder={placeholder}
            onChange={(value, dateString) => form.setFieldValue(field.name, dateString)}
          />
        )}
        <FormikErrorMessage name={name} />
      </Field>
    </div>
  );
};

export default Datepicker;

const StyledDatePicker = styled(DatePicker)`
  ${baseInputStyles}

  .ant-picker-dropdown {
    z-index: 999999 !important;
  }
`;
