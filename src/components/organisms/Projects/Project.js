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

const Project = () => {
  return (
    <Wrapper>
      {/* <Image />
    <Description />
    <Technologies />
    <Button /> */}
    </Wrapper>
  );
};

export default Project;
