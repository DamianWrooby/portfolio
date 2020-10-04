import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import Separator from "../../atoms/Separator/Separator";

const Wrapper = styled.section`
  position: relative;
  background-color: #16232e;
  min-height: 100vh;
  margin-top: 100px;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0 80px;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.md} {
    padding: 200px 0 80px;
  }
  ${({ theme }) => theme.mq.xxl} {
    padding: 200px 0 60px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.xl} {
    flex-direction: row;
  }
`;

const Contact = () => {
  return (
    <Wrapper id="contact">
      <Element name="contact">
        <Content>
          <Main>
            <Separator />
            <SectionHeader
              heading="Contact"
              paragraph="Do you have any questions? Feel free to contact me. I am also open to cooperation with back-end developers or UX/UI designer to gain more experience. Let's get in touch!"
            />
            <InnerWrapper></InnerWrapper>
          </Main>
        </Content>
      </Element>
    </Wrapper>
  );
};

export default Contact;
