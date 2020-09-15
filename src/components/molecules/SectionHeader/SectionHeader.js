import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 0 0 5rem 0;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.bold};
  color: white;
`;

const SectionHeader = ({ header }) => {
  return (
    <Wrapper>
      <Header>{header}</Header>
    </Wrapper>
  );
};

export default SectionHeader;
