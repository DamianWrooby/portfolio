import React, { useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import gsap from "gsap";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import Project from "../Projects/Project";
import Separator from "../../atoms/Separator/Separator";

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
  width: 100%;
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
              fluid(maxWidth: 1000) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);
  console.log(data);
  const {
    allContentfulProject: {
      edges: [...projects],
    },
  } = data;
  console.log(projects);

  const projectsList = projects.map(project => (
    <Project
      key={project.node.title}
      title={project.node.title}
      technologies={project.node.technologies}
      description={project.node.description.description}
      fluid={project.node.screenshot.fluid}
      imgKey={project.node.screenshot.fluid.src}
      imgAlt={project.node.screenshot.title}
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
              paragraph="Let's take a look at latest projects. All of them are available on my GitHub profile."
            />
            <InnerWrapper>{projectsList}</InnerWrapper>
          </Main>
        </Content>
      </Element>
    </Wrapper>
  );
};

export default Projects;
