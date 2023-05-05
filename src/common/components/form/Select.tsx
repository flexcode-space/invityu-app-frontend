import React, { FC } from 'react';
import { Field, FieldProps, useField } from 'formik';
import { Select as AntSelect } from 'antd';
import classNames from 'classnames';
import { StyledSelect } from './style';
import { InputProps } from './type';
import FormikErrorMessage from './FormikErrorMessage';

interface SelectProps extends InputProps {
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
}

const { Option } = AntSelect;

const Select: FC<SelectProps> = ({
  name,
  label,
  placeholder,
  options,
  required,
  note,
  className,
  onChange,
}) => {
  console.log('🚀 aulianza ~ file: Select.tsx:26 ~ options:', options);
  const [field, meta] = useField(name);
  const selectClassNames = classNames('ant-select', className);

  const getPopupContainer = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  const handleSelectChange = (value: string | number, event: any) => {
    onChange(value);
  };

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="mb-3">
          {label && (
            <label htmlFor={name} className="block text-gray-500 text-[14px]">
              {label}
              {required && <span className="text-red-500 text-xs"> *</span>}
              {note && <span className="ml-1 text-red-500 text-xs">{note}</span>}
            </label>
          )}

          <StyledSelect
            className={selectClassNames}
            placeholder={placeholder}
            onBlur={() => field.onBlur(name)}
            getPopupContainer={getPopupContainer}
            onChange={(value, event) => handleSelectChange(value as string | number, event)}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </StyledSelect>
          <FormikErrorMessage name={name} />
        </div>
      )}
    </Field>
  );
};

export default Select;
