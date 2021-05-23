import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import Separator from "../../atoms/Separator/Separator";
import Project from "../Projects/Project";

const Wrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  min-height: 100vh;
  margin-top: 40px;
  ${({ theme }) => theme.mq.xxl} {
    margin-top: 100px;
  }
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.md} {
    padding: 20px 0 0;
  }
  ${({ theme }) => theme.mq.xxl} {
    padding: 20px 0 0;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: -25px;
`;

const WaveWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  margin-top: 90px;
`;

const wavePath = (
  <WaveWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#03131D"
        fillOpacity="1"
        d="M0,64L720,96L1440,32L1440,0L720,0L0,0Z"
      ></path>
    </svg>
  </WaveWrapper>
);

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulProject(sort: { fields: contentfulid }) {
        edges {
          node {
            title
            description {
              childMdx {
                body
              }
            }
            technologies
            codeUrl
            liveDemoUrl
            screenshot {
              file {
                url
              }
              title
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  const {
    allContentfulProject: {
      edges: [...projects],
    },
  } = data;

  const projectsList = projects.map(project => (
    <Project
      key={project.node.title}
      title={project.node.title}
      technologies={project.node.technologies}
      description={project.node.description.childMdx.body}
      // fluid={project.node.screenshot.file.url}
      image={project.node.screenshot.gatsbyImageData}
      imgKey={project.node.screenshot.file.url}
      imgAlt={project.node.screenshot.title}
      liveDemoUrl={project.node.liveDemoUrl}
      codeUrl={project.node.codeUrl}
    />
  ));

  return (
    <Wrapper id="projects">
      <Element name="projects">
        <Content>
          <Main>
            <Separator />
            <SectionHeader
              heading="Projects"
              paragraph="JavaScript-based web applicaton projects. All of them are available on my GitHub profile."
            />
            <InnerWrapper>{projectsList}</InnerWrapper>
          </Main>
        </Content>
        {wavePath}
      </Element>
    </Wrapper>
  );
};

export default Projects;
