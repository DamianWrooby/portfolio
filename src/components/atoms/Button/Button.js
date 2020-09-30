import React from "react";
import styled, { css, keyframes } from "styled-components";

const StyledButton = styled.button`
  position: relative;
  background: #03e9f4;
  color: ${({ theme }) => theme.dark};
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.subFont};
  padding: 20px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  margin-right: 50px;
  &:hover {
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.neonBlue};
    ${({ animation }) =>
      animation &&
      css`
        &:hover {
          background: #03e9f4;
          color: ${({ theme }) => theme.dark};
          box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
            0 0 200px #03e9f4;
          -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
        }
      `}
  }
  ${({ animation }) =>
    animation &&
    css`
      background: transparent;
      color: #16ffff;
    `}
`;

const animate1 = keyframes`
    0%{
        left: -100%;
    }
    50%,100%{
        left: 100%;
    }
`;
const animate2 = keyframes`
    0%{
        top: -100%;
    }
    50%,100%{
        top: 100%;
    }
`;
const animate3 = keyframes`
    0%{
        right: -100%;
    }
    50%,100%{
        right: 100%;
    }
`;
const animate4 = keyframes`
    0%{
        bottom: -100%;
    }
    50%,100%{
        bottom: 100%;
    }
`;

const StyledSpan = styled.span`
  position: absolute;
  display: block;
  &:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #03e9f4;
    ${({ animation }) =>
      animation &&
      css`
        background: linear-gradient(90deg, transparent, #03e9f4);
        animation: ${animate1} 1s linear infinite;
      `}
  }
  &:nth-child(2) {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: #03e9f4;
    ${({ animation }) =>
      animation &&
      css`
        top: -100%;
        background: linear-gradient(180deg, transparent, #03e9f4);
        animation: ${animate2} 1s linear infinite;
        animation-delay: 0.25s;
      `}
  }
  &:nth-child(3) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: #03e9f4;
    ${({ animation }) =>
      animation &&
      css`
        background: linear-gradient(270deg, transparent, #03e9f4);
        animation: ${animate3} 1s linear infinite;
        animation-delay: 0.5s;
      `}
  }
  &:nth-child(4) {
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: #03e9f4;
    ${({ animation }) =>
      animation &&
      css`
        bottom: -100%;
        background: linear-gradient(360deg, transparent, #03e9f4);
        animation: ${animate4} 1s linear infinite;
        animation-delay: 0.75s;
      `}
  }
`;

const Button = ({ label, link, animated, renderAs }) => {
  return (
    <StyledButton
      href={link}
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      as={renderAs}
      animation={animated}
    >
      <StyledSpan animation={animated}></StyledSpan>
      <StyledSpan animation={animated}></StyledSpan>
      <StyledSpan animation={animated}></StyledSpan>
      <StyledSpan animation={animated}></StyledSpan>
      {label}
    </StyledButton>
  );
};

export default Button;
