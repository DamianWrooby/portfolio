import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 0 0 80px 0;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.bold};
  color: white;
  padding: 0 0 25px 0;
`;
const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.gray};
  line-height: 1.3;
  margin: auto;
  width: 90%;
  ${({ theme }) => theme.mq.md} {
    width: 50%;
  }
`;

const SectionHeader = ({ heading, paragraph }) => {
  return (
    <Wrapper>
      <Header>{heading}</Header>
      <Paragraph>{paragraph}</Paragraph>
    </Wrapper>
  );
};

SectionHeader.defaultProps = {
  paragraph: "",
};

SectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
};

export default SectionHeader;
