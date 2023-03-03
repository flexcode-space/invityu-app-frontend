import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Input as InputField } from "antd";

import { InputProps } from "./type";

const baseInputStyles = css`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.7rem;
  border: 2px solid #eee;
  border-radius: 15px;
  box-shadow: none !important;

  .ant-input {
    font-family: var(--poppins-font) !important;
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
    margin-right: ${(props: InputProps) =>
    props.name === "phone" ? "5px" : "10px"};
  }
`;

export const StyledInputPassword = styled(InputField.Password)`
  ${baseInputStyles}
`;
