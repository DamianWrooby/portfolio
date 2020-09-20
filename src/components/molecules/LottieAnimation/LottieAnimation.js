import PropTypes from "prop-types";
import React from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({ animationData, width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={width} height={height} />
    </div>
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
