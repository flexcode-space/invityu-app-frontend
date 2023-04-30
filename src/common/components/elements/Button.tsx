import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import InlineLoader from './InlineLoader';

type ButtonProps = {
  isLoading?: boolean;
  isBlock?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  [key: string]: any;
};

const Button: FC<ButtonProps> = ({
  isLoading,
  isOutline,
  isBlock,
  onClick,
  isDisabled,
  bgColor,
  textColor,
  borderColor,
  children,
  className,
  type,
  ...other
}) => {
  return (
    <>
      {isLoading ? (
        <StyledButton isBlock={isBlock} disabled={true} isLoading={isLoading} {...other}>
          <InlineLoader />
        </StyledButton>
      ) : (
        <StyledButton
          type={type}
          isBlock={isBlock}
          onClick={onClick}
          disabled={isDisabled}
          bgColor={bgColor}
          textColor={textColor}
          borderColor={borderColor}
          className={className}
          {...other}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  width: ${({ isBlock }) => (isBlock ? '100%' : 'auto')};

  background-color: ${({ bgColor }) => bgColor || 'var(--bg-primary-600)'};
  color: ${({ textColor }) => textColor || '#fff'};
  border: 2px solid ${({ borderColor }) => borderColor || 'var(--bg-primary-600)'};

  padding: 11px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;

  transition: all 250ms ease;
  will-change: transition;
  transform: translateY(0px);

  ${({ isLoading }) =>
    !isLoading &&
    css`
      &:hover {
        box-shadow: rgb(0 0 0 / 5%) 0px 1px 6px 0px;
        transform: translateY(-1px);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: no-drop !important;
      background: #eee !important;
      border: 2px solid #eee !important;
      color: #a9a7a7 !important;
    `}
`;
