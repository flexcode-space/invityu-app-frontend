import React, { FC } from 'react';
import { TimePicker as AntTimePicker } from 'antd';
import { Field, FieldProps } from 'formik';
import { TimePickerProps } from 'antd/lib/time-picker';
import styled from '@emotion/styled';
import { baseInputStyles } from './style';
import { InputProps } from './type';

interface TimePickerNewProps extends InputProps {
  onSelectedTime: (time: string | null) => void;
}

const TimePicker: FC<TimePickerNewProps & TimePickerProps> = ({
  name,
  label,
  required,
  note,
  placeholder,
  className,
  onSelectedTime,
  ...others
}) => {
  const onChange: TimePickerProps['onChange'] = (time, timeString) => {
    onSelectedTime(timeString);
  };

  const getPopupContainer = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  return (
    <Field name={name} {...others}>
      {({ field, form }: FieldProps) => (
        <div className={`mb-3 ${className}`}>
          <label htmlFor={name} className="block text-gray-500 text-[14px]">
            {label}
            {required && <span className="text-red-500 text-xs"> *</span>}
            {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
          </label>
          <StyledTimePicker
            {...field}
            format="h:mm"
            placeholder={placeholder}
            defaultValue={others.defaultValue ?? undefined}
            onChange={onChange}
            onBlur={() => form.setFieldTouched(name, true)}
            getPopupContainer={getPopupContainer}
            inputReadOnly={true}
          />
        </div>
      )}
    </Field>
  );
};

export default TimePicker;

const StyledTimePicker = styled(AntTimePicker)`
  ${baseInputStyles}

  .ant-picker-dropdown {
    z-index: 999999 !important;
  }
`;
