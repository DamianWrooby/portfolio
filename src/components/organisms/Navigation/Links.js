import React from "react";
import styled, { css } from "styled-components";
import styles from "./Links.css";

import { Link } from "react-scroll";

const ListItem = styled.li`
  position: relative;
  cursor: pointer;
  margin-left: 35px;
  color: ${({ theme }) => theme.gray};
  font-weight: ${({ theme }) => theme.medium};
  &:hover {
    color: ${({ theme }) => theme.neonBlue};
  }
  ${({ theme }) => theme.mq.s} {
    font-size: ${({ theme }) => theme.fontSize.xs};
    &:after {
      width: 150px;
    }
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    transition: transform 0.5s ease;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.neonBlue};
  }
  &:before {
    width: 100%;
    height: 2px;
    transform: translateX(101%);
  }
  &:after {
    width: 2px;
    height: 100%;
    transform: translateY(100%);
  }
  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
`;

const StyledSpan = styled.span`
  position: relative;
  color: inherit;
  text-decoration: none;
  line-height: 24px;
  display: block;
  padding: 8px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    transition: transform 0.5s ease;
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.neonBlue};
  }
  &:before {
    width: 100%;
    height: 2px;
    transform: translateX(101%);
  }
  &:after {
    width: 2px;
    height: 100%;
    transform: translateY(-100%);
  }
  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after,
  &.active {
    transform: translate(0, 0);
  }
`;

const Links = () => {
  return (
    <>
      <ListItem>
        <StyledLink
          activeClass={styles.active}
          duration={800}
          smooth={true}
          to="home"
          spy={true}
        >
          <StyledSpan>Home</StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          activeClass={styles.active}
          duration={800}
          smooth={true}
          to="technologies"
          spy={true}
        >
          <StyledSpan>Technologies</StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="projects" spy={true}>
          <StyledSpan>Projects</StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="contact" spy={true}>
          <StyledSpan>Contact</StyledSpan>
        </StyledLink>
      </ListItem>
    </>
  );
};

export default Links;
