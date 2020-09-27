import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.xxl} {
    flex-direction: row;
  }
`;

const Project = ({ title }) => {
  return (
    <Wrapper>
      <p>{title}</p>
      {/* <Image />
      <Description />
      <Technologies />
      <Button />  */}
    </Wrapper>
  );
};

export default Project;
