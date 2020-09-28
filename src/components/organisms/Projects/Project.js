import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";
import Img from "gatsby-image";

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  ${({ theme }) => theme.mq.xxl} {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.figure`
  width: 100%;
  ${"" /* ${({ theme }) => theme.mq.xxl} {
    flex-direction: row;
  } */}
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  padding: 25px 0 25px 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.subFont};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.lightGray};
  line-height: 1.5;
`;

const StyledImg = styled(Img)`
  border-radius: 20px;
`;

const Project = ({
  title,
  description,
  technologies,
  codeUrl,
  liveDemoUrl,
  fluid,
  imgKey,
  imgAlt,
}) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImg fluid={fluid} key={imgKey} alt={imgAlt} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {/* <Technologies>{technologiesList}</Technologies> */}
    </Wrapper>
  );
};

export default Project;
