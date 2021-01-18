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

const Website = ({
  title,
  description,
  scopeOfWork,
  websiteUrl,
  fluid,
  imgKey,
  imgAlt,
}) => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const content = contentRef.current;

    if (content && image) {
      gsap.from(image, {
        autoAlpha: 0,
        x: "-=150",
        scrollTrigger: {
          trigger: image,
          start: "top bottom-=200px",
        },
      });
      gsap.from(content.children, {
        autoAlpha: 0,
        y: "-=50",
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: image,
          start: "top bottom-=200px",
        },
      });
    }
  }, []);

  const scopeList = scopeOfWork.map(el => {
    return <Item key={el}>{el}</Item>;
  });

  return (
    <Wrapper>
      <ImageWrapper ref={imageRef}>
        <StyledImg fluid={fluid} key={imgKey} alt={imgAlt} />
      </ImageWrapper>
      <ContentWrapper ref={contentRef}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ListTitle>Technology</ListTitle>
        <List>{techList}</List>
        <ListTitle>Scope of work</ListTitle>
        <List>{scopeList}</List>
        <ButtonsWrapper>
          <Button
            renderAs="a"
            label="View"
            link={websiteUrl}
            animated={false}
          />
        </ButtonsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

Project.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fluid: PropTypes.object.isRequired,
  imgAlt: PropTypes.string.isRequired,
  imgKey: PropTypes.string.isRequired,
  technologies: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  scopeOfWork: PropTypes.array.isRequired,
};

export default Website;
