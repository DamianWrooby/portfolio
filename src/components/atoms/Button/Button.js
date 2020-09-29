import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  position: relative;
  display: inline-block;
  padding: 25px 30px;
  margin: 40px 0;
  color: #16ffff;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  margin-right: 50px;
  &:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 200px #03e9f4;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
`;

const StyledSpan = styled.span``;

const Button = ({ link, type }) => {};

export default Button;
