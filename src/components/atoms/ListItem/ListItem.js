import React from "react";
import styled from "styled-components";

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.light};
  margin: 8px 0;
  &:before {
    content: "";
    ${"" /* -webkit-mask: ${props => `url(${props.icon}) no-repeat 50% 50%`};
    mask: ${props => `url(${props.icon}) no-repeat 50% 50%`};
    -webkit-mask-size: contain;
    mask-size: contain; */}
    display: inline-block;
    width: 22px;
    height: 22px;
    background: ${props => `url(${props.icon}) no-repeat top center`};
    background-size: 100%;
    margin-right: 10px;
    ${"" /* background-color: ${({ theme }) => theme.neonBlue}; */}
  }
  ${({ theme }) => theme.mq.s} {
    font-size: ${({ theme }) => theme.fontSize.xlg};
    &:before {
      width: 20px;
      height: 28px;
    }
  }
`;

const ListItem = ({ icon, children }) => {
  return <StyledItem icon={icon}>{children}</StyledItem>;
};

export default ListItem;
