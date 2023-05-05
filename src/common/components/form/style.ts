import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input as InputField, Select as AntSelect } from 'antd';

import { InputProps } from './type';

export const baseInputStyles = css`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.7rem;
  border: 2px solid #ebf2fc;
  border-radius: 15px;
  box-shadow: none !important;

  .ant-input {
    font-family: var(--gilroy-font) !important;
    font-size: 15px !important;
  }

  .ant-input[readonly] {
    background-color: #ebf2fc !important;
  }

  &:hover,
  &:focus {
    outline: none !important;
    border: 2px solid var(--bg-primary-200) !important;
  }
`;

export const StyledInput = styled(InputField)`
  ${baseInputStyles}

  ${({ readOnly }) =>
    readOnly &&
    css`
      background-color: #ebf2fc !important;
    `}

  .ant-input-prefix {
    margin-right: ${(props: InputProps) => (props.name === 'phone' ? '5px' : '10px')};
  }
`;

export const StyledInputPassword = styled(InputField.Password)`
  ${baseInputStyles}
`;

export const StyledSelect = styled(AntSelect)`
  width: 100%;
  margin: 0.5rem 0;

  .ant-select-selector {
    border: 2px solid #ebf2fc !important;
    border-radius: 15px;
    height: 47px !important;
  }

  .ant-select-selector:focus {
    box-shadow: unset !important;
    border: 2px solid var(--bg-primary-200) !important;
  }

  .ant-select-selector:hover {
    box-shadow: unset !important;
    border: 2px solid var(--bg-primary-200) !important;
  }

  .ant-select-selection-item {
    line-height: 45px !important;
    font-weight: 500;
  }

  .ant-select-selection-placeholder {
    line-height: 45px !important;
  }
`;
