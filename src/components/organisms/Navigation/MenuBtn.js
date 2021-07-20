import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { NavigationContext } from "../../../contexts/NavigationContext";

const TopLine = styled.div`
  background-color: ${({ theme }) => theme.neonBlue};
  border-radius: 2px;
  width: 12px;
  height: 4px;
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
  width: 25px;
  height: 4px;
  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
    `}
`;

const BottomLine = styled.div`
  background-color: ${({ theme }) => theme.neonBlue};
  border-radius: 2px;
  width: 12px;
  height: 4px;
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
  right: 3%;
  z-index: 20;
  width: 36px;
  height: 26px;
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

const Background = styled.div`
  position: fixed;
  top: -32px;
  right: -2%;
  width: 70px;
  height: 95px;
  border-bottom-left-radius: 40px;
  background-color: #16232d;
  ${"" /* box-shadow: 0 0 10px rgba(84, 227, 255, 0.7); */}
  opacity: 0;
  transition: 0.3s;
  ${({ theme }) => theme.mq.s} {
    width: 117px;
  }
  }
  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
    `}
  ${({ inactive }) =>
    inactive &&
    css`
      box-shadow: none;
    `}
`;

const MenuBtn = () => {
  const { isMobileNavVisible, handleMobileNav, isTransparent } = useContext(
    NavigationContext
  );

  const toggleNav = () => {
    handleMobileNav(!isMobileNavVisible);
  };

  return (
    <>
      <Button
        onClick={toggleNav}
        isActive={isMobileNavVisible}
        aria-label="Menu toggle button"
      >
        <TopLine isActive={isMobileNavVisible} />
        <MiddleLine isActive={isMobileNavVisible} />
        <BottomLine isActive={isMobileNavVisible} />
      </Button>
      <Background visible={!isTransparent} inactive={isMobileNavVisible} />
    </>
  );
};

export default MenuBtn;
