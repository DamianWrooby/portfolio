import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styled from "styled-components";
import Lottie from "react-lottie";

const Wrapper = styled.div`
  max-width: 90vw;
  display: flex;
  align-items: center;
`;

const LottieAnimation = ({ animationData, width, height }) => {
  const AnimationRef = useRef(null);

  useEffect(() => {
    const Animation = AnimationRef.current;

    gsap.from(Animation, {
      autoAlpha: 0,
      y: "-=50",
      duration: 2,
      scrollTrigger: {
        trigger: Animation,
        start: "top bottom-=300px",
      },
    });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper ref={AnimationRef}>
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
