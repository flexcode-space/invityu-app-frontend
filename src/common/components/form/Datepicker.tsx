import React, { FC } from 'react';
import { Field, FieldProps } from 'formik';
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import styled from '@emotion/styled';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import locale from 'antd/locale/id_ID';

import FormikErrorMessage from './FormikErrorMessage';

import { InputProps } from './type';
import { baseInputStyles } from './style';

interface DatePickerNewProps extends InputProps {
  onSelectedDate: (date: string | null) => void;
}

const Datepicker: FC<DatePickerNewProps> = ({
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
  onSelectedDate,
  ...others
}) => {
  const dateFormat = 'dddd, DD MMMM YYYY';

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
    onSelectedDate(formattedDate);
  };

  const getPopupContainer = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="mb-3" {...others}>
          <label htmlFor={name} className="block text-gray-500 text-[14px]">
            {label}
            {required && <span className="text-red-500 text-xs"> *</span>}
            {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
          </label>
          <ConfigProvider locale={locale}>
            <StyledDatePicker
              placeholder={placeholder}
              onChange={onChange}
              getPopupContainer={getPopupContainer}
              format={dateFormat}
              value={value ? dayjs(value) : undefined}
              // inputReadOnly={true}
            />
          </ConfigProvider>
          <FormikErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
};

export default Datepicker;

const StyledDatePicker = styled(DatePicker)`
  ${baseInputStyles}

  .ant-picker-dropdown {
    z-index: 999999 !important;
  }
`;
