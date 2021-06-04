import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { NavigationContext } from "../../../contexts/NavigationContext";
import { Link } from "react-scroll";
import { Link as GatsbyLink } from "gatsby";

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
    margin-top: 0;
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

const StyledGatsbyLink = styled(GatsbyLink)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-family: 'Sarala',sans-serif;
  text-decoration: none;
  color: ${({ theme }) => theme.gray};
  font-weight: ${({ theme }) => theme.medium};
  &:hover {
    color: ${({ theme }) => theme.neonBlue};
  }
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

const HomePageLinks = ({active}) => {
  return (
  <>
      <ListItem>
        <StyledLink
          active={active === "home" ? 1 : 0}
          duration={800}
          smooth={true}
          to="home"
          spy={true}
        >
          <StyledSpan active={active === "home" ? 1 : 0}>Home</StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={active === "technologies" ? 1 : 0}
          duration={800}
          offset={-100}
          smooth={true}
          to="technologies"
          spy={true}
        >
          <StyledSpan active={active === "technologies" ? 1 : 0}>
            Technologies
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={active === "projects" ? 1 : 0}
          duration={800}
          offset={-100}
          smooth={true}
          to="projects"
          spy={true}
        >
          <StyledSpan active={active === "projects" ? 1 : 0}>
            Projects
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={active === "websites" ? 1 : 0}
          duration={800}
          offset={-100}
          smooth={true}
          to="websites"
          spy={true}
        >
          <StyledSpan active={active === "websites" ? 1 : 0}>
            Websites
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink
          active={active === "contact" ? 1 : 0}
          duration={800}
          smooth={true}
          to="contact"
          spy={true}
        >
          <StyledSpan active={active === "contact" ? 1 : 0}>
            Contact
          </StyledSpan>
        </StyledLink>
      </ListItem>
      <ListItem>
    <StyledGatsbyLink
      active={active === "blog" ? 1 : 0}
      to="/blog"
    >
      <StyledSpan active={active === "blog" ? 1 : 0}>
        Blog
      </StyledSpan>
    </StyledGatsbyLink>
  </ListItem>
    </>
  )
}

function BlogPageLinks({active}) {
  return (
  <>
  <ListItem>
    <StyledGatsbyLink
      active={active === "home" ? 1 : 0}
      to="/"
    >
      <StyledSpan active={active === "home" ? 1 : 0}>Home</StyledSpan>
    </StyledGatsbyLink>
  </ListItem>
  <ListItem>
    <StyledGatsbyLink
      active={active === "blog" ? 1 : 0}
      to="/blog"
    >
      <StyledSpan active={active === "blog" ? 1 : 0}>
        Blog
      </StyledSpan>
    </StyledGatsbyLink>
  </ListItem>
</>

)
  };


const Links = () => {
  const { activeLink, currentPage } = useContext(NavigationContext);


  return currentPage === "blog" ? <BlogPageLinks active={currentPage} /> : <HomePageLinks active={activeLink} />;
};

export default Links;
