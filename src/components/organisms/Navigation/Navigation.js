import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import Links from "../../organisms/Navigation/Links";
// import MobileNav from 'components/organisms/Navigation/MobileNav';
// import Logo from 'components/atoms/Logo/Logo';

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 10;
  box-shadow: none;
  background-color: transparent;
  transition: 0.3s;
`;

const LogoWrapper = styled(Link)`
  display: block;
  text-decoration: none;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.white};
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
  return (
    <>
      <Wrapper>
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
