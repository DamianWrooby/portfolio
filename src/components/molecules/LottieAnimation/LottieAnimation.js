import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 90vw;
  display: flex;
  align-items: center;
`;

const Player = styled.div`
  overflow: hidden;
  margin: 0 auto;
`;

const loadPlayer = () =>
  import("lottie-web/build/player/lottie_light").then((m) => m.default || m);

const LottieAnimation = ({ loadAnimationData, width = 400, height = 400 }) => {
  const AnimationRef = useRef(null);
  const PlayerRef = useRef(null);

  useEffect(() => {
    const Animation = AnimationRef.current;

    const tween = gsap.from(Animation, {
      autoAlpha: 0,
      y: "-=50",
      duration: 2,
      scrollTrigger: {
        trigger: Animation,
        start: "top bottom-=300px",
      },
    });

    let animation;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        Promise.all([loadPlayer(), loadAnimationData()]).then(
          ([lottie, data]) => {
            if (cancelled) return;
            animation = lottie.loadAnimation({
              container: PlayerRef.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: data.default || data,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            });
          },
        );
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(Animation);

    return () => {
      cancelled = true;
      observer.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
      animation?.destroy();
    };
  }, [loadAnimationData]);

  return (
    <Wrapper ref={AnimationRef}>
      <Player
        ref={PlayerRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        aria-hidden="true"
      />
    </Wrapper>
  );
};

LottieAnimation.propTypes = {
  loadAnimationData: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LottieAnimation;
