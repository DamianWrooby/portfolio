import React, { useContext } from "react";
import styled, { css } from "styled-components";
import Content from "../../atoms/Content/Content";
import Links from "../../organisms/Navigation/Links";
import { NavigationContext } from "../../../contexts/NavigationContext";
// import MobileNav from 'components/organisms/Navigation/MobileNav';
// import Logo from 'components/atoms/Logo/Logo';

const Wrapper = styled.nav`
  position: fixed;
  max-width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 10;
  box-shadow: none;
  background-color: transparent;
  transition: 0.3s;
  ${({ theme }) => theme.mq.md} {
    position: fixed;
    ${({ active }) =>
      active &&
      css`
        box-shadow: 0 0 10px rgba(84, 227, 255, 0.7);
        background-color: ${({ theme }) => theme.dark};
      `}
  }
`;

// const LogoWrapper = styled(Link)`
//   display: block;
//   text-decoration: none;
// `;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  opacity: 0;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.xs} {
    display: flex;
    opacity: 1;
  }
`;

const List = styled.ul`
  display: none;
  align-items: center;
  opacity: 0;
  ${({ theme }) => theme.mq.xs} {
    display: flex;
    opacity: 1;
  }
`;

const Navigation = () => {
  const { isTransparent } = useContext(NavigationContext);

  return (
    <>
      <Wrapper active={!isTransparent}>
        <Content>
          <InnerWrapper>
            {/* <LogoWrapper to="/">
              <Logo />
            </LogoWrapper> */}
            <List>
              <Links />
            </List>
          </InnerWrapper>
          {/* <MobileNav /> */}
        </Content>
      </Wrapper>
    </>
  );
};

export default Navigation;
