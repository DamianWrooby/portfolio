import React from "react";
import styled, { css } from "styled-components";

import { Link } from "react-scroll";

const ListItem = styled.li`
  position: relative;
  margin-left: 35px;
  color: ${({ theme }) => theme.gray};
  font-weight: ${({ theme }) => theme.medium};
  &:hover {
    color: ${({ theme }) => theme.white};
  }
  ${({ theme }) => theme.mq.s} {
    font-size: ${({ theme }) => theme.fontSize.xs};
    &:after {
      width: 150px;
    }
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: 0.2s;
  cursor: pointer;
`;

const Links = () => {
  return (
    <>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="home">
          Home
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="technologies">
          Technologies
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="projects">
          Projects
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink duration={800} smooth={true} to="contact">
          Contact
        </StyledLink>
      </ListItem>
    </>
  );
};

export default Links;
