
  
import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import Content from 'components/atoms/Content/Content';
import Links from 'components/organisms/Navigation/Links';
import Fullnav from 'components/organisms/Navigation/Fullnav';
import Logo from 'components/atoms/Logo/Logo';
import SEO from 'components/atoms/SEO/SEO';

interface Props {
  readonly isActive: boolean;
}

const Wrapper = styled.nav<Props>`
  position: absolute;
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
    ${({ isActive }) =>
      isActive &&
      css`
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background-color: ${({ theme }) => theme.dark100};
      `}
  }
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
  justify-content: space-between;
  color: ${({ theme }) => theme.white};
`;

const List = styled.ul`
  display: none;
  align-items: center;
  opacity: 0;
  ${({ theme }) => theme.mq.md} {
    display: flex;
  }
`;

const Navigation = () => {

  return (
    <>
      <Wrapper isActive={!isTransparent}>
        <Content>
          <InnerWrapper>
            {/* <LogoWrapper to="/">
              <Logo />
            </LogoWrapper> */}
            <List ref={listRef}>
              <Links />
            </List>
          </InnerWrapper>
          <Fullnav />
        </Content>
      </Wrapper>
    </>
  );
};

export default Navigation;