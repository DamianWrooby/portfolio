import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.neonBlue};
  padding: 30px 0;
`;

const Text = styled.h3`
  color: ${({ theme }) => theme.darkBlue};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  ${({ theme }) => theme.mq.md} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const Footer = () => (
  <Wrapper>
    <Text>&copy; 2021 Damian Wróblewski. All rights reserved.</Text>
  </Wrapper>
);

export default Footer;
