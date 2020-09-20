import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";

const LottieAnimation = ({ animationData, width, height }) => {
  const Wrapper = styled.div`
    display: flex;
    align-items: center;
  `;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <Lottie options={defaultOptions} width={width} height={height} />
    </Wrapper>
  );
};

LottieAnimation.defaultProps = {
  width: 400,
  height: 400,
};

LottieAnimation.propTypes = {
  animationData: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LottieAnimation;
