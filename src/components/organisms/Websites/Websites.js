import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Element } from "react-scroll";
import styled from "styled-components";
import Content from "../../atoms/Content/Content";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import Separator from "../../atoms/Separator/Separator";
import Website from "../Websites/Website";

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

const Websites = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulWebsite(sort: { fields: contentfulid }) {
        edges {
          node {
            title
            description {
              description
            }
            technologies
            scopeOfWork
            websiteUrl
            fullScreenshot {
              file {
                url
              }
            }
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

  const {
    allContentfulWebsite: {
      edges: [...websites],
    },
  } = data;

  const websitesList = websites.map(website => (
    <Website
      key={website.node.title}
      title={website.node.title}
      technologies={website.node.technologies}
      description={website.node.description.description}
      fluid={website.node.screenshot.fluid}
      imgKey={website.node.screenshot.fluid.src}
      imgAlt={website.node.title}
      websiteUrl={website.node.websiteUrl}
      scopeOfWork={website.node.scopeOfWork}
      fullScreenshotUrl={website.node.fullScreenshot.file.url}
    />
  ));

  return (
    <Wrapper id="websites">
      <Element name="websites">
        <Content>
          <Main>
            <Separator />
            <SectionHeader
              heading="Websites"
              paragraph="Some of recently created websites for commercial clients"
            />
            <InnerWrapper>{websitesList}</InnerWrapper>
          </Main>
        </Content>
        {wavePath}
      </Element>
    </Wrapper>
  );
};

export default Websites;
