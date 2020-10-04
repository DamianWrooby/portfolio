import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { NavigationContext } from "../../../contexts/NavigationContext";

import { Link } from "react-scroll";

const ListItem = styled.li`
  position: relative;
  cursor: pointer;
  margin-top: 15px;
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
  ${({ theme }) => theme.mq.md} {
    margin-left: 35px;
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
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.neonBlue};
      &:before,
      &:after {
        transform: translate(0, 0);
      }
    `}
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
  &:hover > span:after {
    transform: translate(0, 0);
  }
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.neonBlue};
      &:before,
      &:after {
        transform: translate(0, 0);
      }
    `}
`;

const Links = () => {
  const { activeLink } = useContext(NavigationContext);

  return (
    <>
      <ListItem>
        <StyledLink
          active={activeLink === "home" ? 1 : 0}
          duration={800}
          smooth={true}
          to="home"
          spy={true}
        >
          <StyledSpan active={activeLink === "home" ? 1 : 0}>Home</StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={activeLink === "technologies" ? 1 : 0}
          duration={800}
          offset={-100}
          smooth={true}
          to="technologies"
          spy={true}
        >
          <StyledSpan active={activeLink === "technologies" ? 1 : 0}>
            Technologies
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={activeLink === "projects" ? 1 : 0}
          duration={800}
          offset={-100}
          smooth={true}
          to="projects"
          spy={true}
        >
          <StyledSpan active={activeLink === "projects" ? 1 : 0}>
            Projects
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={activeLink === "contact" ? 1 : 0}
          duration={800}
          smooth={true}
          to="contact"
          spy={true}
        >
          <StyledSpan active={activeLink === "contact" ? 1 : 0}>
            Contact
          </StyledSpan>
        </StyledLink>
      </ListItem>
    </>
  );
};

export default Links;
