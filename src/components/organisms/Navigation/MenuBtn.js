import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { NavigationContext } from "../../../contexts/NavigationContext";

const TopLine = styled.div`
  background-color: ${({ theme }) => theme.neonBlue};
  border-radius: 2px;
  width: 50%;
  height: 5px;
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: right;
  ${({ isActive }) =>
    isActive &&
    css`
      transform: rotate(-90deg) translateX(3px);
      box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
    `}
`;

const MiddleLine = styled.div`
  background-color: ${({ theme }) => theme.neonBlue};
  border-radius: 2px;
  width: 100%;
  height: 5px;
  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
    `}
`;

const BottomLine = styled.div`
  background-color: ${({ theme }) => theme.neonBlue};
  border-radius: 2px;
  width: 50%;
  height: 5px;
  align-self: flex-end;
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: left;
  ${({ isActive }) =>
    isActive &&
    css`
      transform: rotate(-90deg) translateX(-3px);
      box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
    `}
`;

const Button = styled.button`
  position: fixed;
  top: 20px;
  right: 5%;
  z-index: 20;
  width: 50px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  cursor: pointer;
  transition: transform 330ms ease-out;
  ${({ isActive }) =>
    isActive &&
    css`
      transform: rotate(-45deg);
    `}
`;

const MenuBtn = () => {
  const { isMobileNavVisible, handleMobileNav } = useContext(NavigationContext);

  const toggleNav = () => {
    handleMobileNav(!isMobileNavVisible);
  };

  return (
    <Button onClick={toggleNav} isActive={isMobileNavVisible}>
      <TopLine isActive={isMobileNavVisible} />
      <MiddleLine isActive={isMobileNavVisible} />
      <BottomLine isActive={isMobileNavVisible} />
    </Button>
  );
};

export default MenuBtn;
