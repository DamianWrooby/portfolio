import React from "react";
import styled from "styled-components";
import separatorImg from "../../../assets/images/separator.png";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 60px;
`;

const Separator = () => {
  return (
    <Wrapper>
      <img width="100px" src={separatorImg} alt="" />
    </Wrapper>
  );
};

export default Separator;
