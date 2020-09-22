import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledItem = styled.li`
  display: flex;
  min-height: 30px;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.light};
  margin: 8px 0;
  min-width: 220px;
  &:before {
    content: "";
    display: inline-block;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    background: ${props => `url(${props.icon}) no-repeat top center`};
    background-size: 100%;
    margin-right: 10px;
    ${"" /* background-color: ${({ theme }) => theme.neonBlue}; */}
  }
  ${({ theme }) => theme.mq.s} {
    font-size: ${({ theme }) => theme.fontSize.xlg};
    min-width: 250px;
  }
`;

const ListItem = ({ icon, width, height, children }) => {
  return (
    <StyledItem icon={icon} width={width} height={height}>
      {children}
    </StyledItem>
  );
};

ListItem.defaultProps = {
  children: "Text",
  width: "20",
  height: "20",
};

ListItem.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default ListItem;
