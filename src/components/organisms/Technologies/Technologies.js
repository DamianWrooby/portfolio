import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Element } from "react-scroll";
import styled from "styled-components";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import ItemList from "../../molecules/ItemList/ItemList";

const Technologies = () => {
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
  `;

  const ListsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 720px;
  `;

  const List = styled.ul`
    display: flex;
    flex-direction: column;
  `;

  const wavePath = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style={{ marginTop: "-295px", zIndex: "2", position: "absolute" }}
    >
      <path
        fill="#03131D"
        fill-opacity="1"
        d="M0,128L720,192L1440,128L1440,320L720,320L0,320Z"
      ></path>
    </svg>
  );

  return (
    <>
      <Wrapper id="technologies">
        {wavePath}
        <Element name="technologies">
          <Main>
            <SectionHeader header="Technologies" />
            <InnerWrapper>
              <ListsWrapper>
                <List>
                  <ItemList />
                </List>
                <List></List>
              </ListsWrapper>
            </InnerWrapper>
            {/* <TagCloud /> */}
          </Main>
        </Element>
      </Wrapper>
    </>
  );
};

export default Technologies;
