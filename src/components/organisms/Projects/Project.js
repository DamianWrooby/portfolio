import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";
import Img from "gatsby-image";

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
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
        <Img fluid={fluid} key={imgKey} alt={imgAlt} />
      </ImageWrapper>
      <h2>{title}</h2>

      {/* <Image />
      <Description />
      <Technologies />
      <Button />  */}
    </Wrapper>
  );
};

export default Project;
