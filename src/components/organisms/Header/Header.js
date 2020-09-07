import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollMagic from "scrollmagic";
import styled from "styled-components";
import headerBackground from "../../../images/header-background.jpg";
import topLayerImg from "../../../images/header-top-layer.png";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, gsap);

const Wrapper = styled.header`
  position: relative;
  width: 100%;
  padding: 0;
  @media (min-height: 620px) {
    ${"" /* height: 100vh; */}
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: 700;
  margin-left: 240px;
  color: white;
  z-index: 3;
`;

const SecondTitle = styled.p`
  position: absolute;
  top: 34vh;
  left: 39vw;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: white;
  z-index: 3;
`;

const SecondSubtitle = styled.p`
  position: absolute;
  top: 42vh;
  left: 20vw;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  margin-left: 240px;
  color: white;
  z-index: 3;
`;

const ColorSpan = styled.span`
  color: ${({ theme }) => theme.blue};
`;

const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  margin-left: 250px;
  color: white;
  z-index: 3;
`;

const StickyBackground = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(${headerBackground}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;
const TopLayerImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(${topLayerImg}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: 3;
`;

const TopLayerBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 2;
`;

const Header = () => {
  const topLayerRef = useRef(null);
  const topLayerBgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const secondTitleRef = useRef(null);
  const secondSubtitleRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const topLayer = topLayerRef.current;
    const topLayerBg = topLayerBgRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const secondTitle = secondTitleRef.current;
    const secondSubtitle = secondSubtitleRef.current;
    const wrapper = wrapperRef.current;

    gsap.set([topLayer, title, subtitle], { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    const tl2 = gsap.timeline({ paused: true });

    const controller = new ScrollMagic.Controller();

    tl.fromTo(
      title,
      { y: "-=200" },
      { duration: 1, y: "+=200", autoAlpha: 1 }
    ).fromTo(
      subtitle,
      { x: "-=100" },
      { duration: 1, x: "+=100", autoAlpha: 1 }
    );

    tl2
      .fromTo(
        topLayer,
        {
          autoAlpha: 0,
        },
        {
          duration: 3,
          ease: "power4.in",
          autoAlpha: 1,
        }
      )
      .to(
        [title, subtitle],
        {
          duration: 1,
          y: -100,
          autoAlpha: 0,
        },
        "-=3"
      )
      .fromTo(
        secondTitle,
        {
          autoAlpha: 0,
          y: "+=200",
        },
        {
          duration: 2,
          y: "-=200",
          ease: "power1.in",
          autoAlpha: 1,
        },
        "-=3"
      )
      .fromTo(
        secondSubtitle,
        {
          y: "+=200",
        },
        {
          duration: 2,
          y: "-=200",
          ease: "power1.in",
        },
        "-=2"
      )
      .fromTo(
        secondSubtitle,
        {
          autoAlpha: 0,
        },
        {
          duration: 2,
          ease: "power4.in",
          autoAlpha: 1,
        },
        "-=2"
      )
      .fromTo(
        topLayerBg,
        {
          autoAlpha: 0,
        },
        {
          duration: 3,
          autoAlpha: 1,
        }
      );

    const scene = new ScrollMagic.Scene({
      triggerElement: wrapper,
      duration: 1000,
      triggerHook: 0,
    })
      .addIndicators()
      .addTo(controller)
      .setTween(tl2.resume())
      .setPin(wrapper);

    console.log(scene);
  });

  return (
    <Wrapper ref={wrapperRef}>
      <StickyBackground>
        <TopLayerImg ref={topLayerRef} />
        <TopLayerBg ref={topLayerBgRef} />
        <Title ref={titleRef}>
          Hi, I am <ColorSpan>Damian</ColorSpan>
        </Title>
        <Subtitle ref={subtitleRef}>I am front-end web developer</Subtitle>
        <SecondTitle ref={secondTitleRef}>
          I will turn your <ColorSpan>ideas</ColorSpan>
        </SecondTitle>
        <SecondSubtitle ref={secondSubtitleRef}>
          Into clean and effective <ColorSpan>code</ColorSpan>
        </SecondSubtitle>
      </StickyBackground>
    </Wrapper>
  );
};

export default Header;
