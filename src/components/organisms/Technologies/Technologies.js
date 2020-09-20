import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import List from "../../molecules/List/List";
import LottieAnimation from "../../molecules/LottieAnimation/LottieAnimation";
import laptopAnimation from "../../../assets/lotties/laptop.json";

const Wrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  min-height: 100vh;
  margin-top: 170px;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 80px;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.md} {
    padding: 20px 0 80px;
  }
  ${({ theme }) => theme.mq.md} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mq.xl} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mq.xxl} {
    padding: 20px 0 60px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
  }
`;

const wavePath = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    style={{ marginTop: "-295px", zIndex: "2", position: "absolute" }}
  >
    <path
      fill="#03131D"
      fillOpacity="1"
      d="M0,128L720,192L1440,128L1440,320L720,320L0,320Z"
    ></path>
  </svg>
);

const Technologies = () => {
  return (
    <>
      <Wrapper id="technologies">
        {wavePath}
        <Element name="technologies">
          <Content>
            <Main>
              <SectionHeader
                heading="Technologies"
                paragraph="These are technologies, tools and methodologies I used to use in my projects. I'm currently improving my skills in the field of building and testing more complex React applications."
              />
              <InnerWrapper>
                <List />
                <LottieAnimation
                  animationData={laptopAnimation}
                  width={600}
                  height={450}
                />
              </InnerWrapper>
            </Main>
          </Content>
        </Element>
      </Wrapper>
    </>
  );
};

export default Technologies;
