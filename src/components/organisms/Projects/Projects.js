import React, { useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import gsap from "gsap";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import Project from "../Projects/Project";

const Wrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  min-height: 100vh;
  margin-top: 100px;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 80px;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.md} {
    padding: 20px 0 80px;
  }
  ${({ theme }) => theme.mq.xxl} {
    padding: 20px 0 60px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.xl} {
    flex-direction: row;
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulProject {
        edges {
          node {
            title
            description {
              description
            }
            technologies
            codeUrl
            liveDemoUrl
            screenshot {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Wrapper id="projects">
      <Element name="projects">
        <Content>
          <Main>
            <SectionHeader
              heading="Projects"
              paragraph="Let's take a look at latest projects. All of them are available on my GitHub profile."
            />
            <InnerWrapper>
              <Project title={data.allContentfulProject.edges[0].node.title} />
            </InnerWrapper>
          </Main>
        </Content>
      </Element>
    </Wrapper>
  );
};

export default Projects;
