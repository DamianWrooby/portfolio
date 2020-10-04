import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";
import Img from "gatsby-image";
import listIcon from "../../../assets/images/favicon.png";
import Button from "../../atoms/Button/Button";

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  ${({ theme }) => theme.mq.xl} {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.figure`
  width: 100%;
  ${({ theme }) => theme.mq.xl} {
    margin: 25px 60px 0px 60px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  padding: 25px 0 25px 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.subFont};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.lightGray};
  line-height: 1.5;
`;

const StyledImg = styled(Img)`
  border-radius: 20px;
`;

const ListTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.bold};
  color: white;
  padding: 40px 0 20px 0;
`;

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.white};
`;

const Item = styled.li`
  padding: 10px 15px 10px 0;
  &:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 10px;
    background: url(${listIcon}) no-repeat top center;
    background-size: 100%;
    margin-right: 7px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 30px 0;
  justify-content: flex-start;
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
  const techList = technologies.map(el => {
    return <Item key={el}>{el}</Item>;
  });

  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImg fluid={fluid} key={imgKey} alt={imgAlt} />
      </ImageWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ListTitle>Technologies & Tools</ListTitle>
        <List>{techList}</List>
        <ButtonsWrapper>
          <Button renderAs="a" label="Code" link={codeUrl} animated={false} />
          <Button
            renderAs="a"
            label="Live Demo"
            link={liveDemoUrl}
            animated={true}
          />
        </ButtonsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

Project.propTypes = {
  codeUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fluid: PropTypes.object.isRequired,
  imgAlt: PropTypes.string.isRequired,
  imgKey: PropTypes.string.isRequired,
  liveDemoUrl: PropTypes.any.isRequired,
  technologies: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default Project;