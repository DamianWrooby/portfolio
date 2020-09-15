import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollMagic from "scrollmagic";
import { Element } from "react-scroll";
import styled from "styled-components";
import realFace from "../../../images/first-layer.png";
import robotFace from "../../../images/header-1.png";
import codePattern from "../../../images/code-pattern.jpg";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, gsap);

const Wrapper = styled.header`
  position: relative;
  width: 100%;
  padding: 0;
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
  top: 39vh;
  left: 39vw;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: white;
  z-index: 3;
`;

const SecondSubtitle = styled.p`
  position: absolute;
  top: 47vh;
  left: 20vw;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  margin-left: 240px;
  color: white;
  z-index: 3;
`;

const ColorSpan = styled.span`
  color: ${({ theme }) => theme.neonBlue};
`;

const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  margin-left: 250px;
  color: white;
  z-index: 3;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`;
const FirsLayerImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(${realFace}) no-repeat;
  background-size: contain;
  background-attachment: fixed;
  z-index: 1;
`;

const SecondLayerImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(${robotFace}) no-repeat;
  background-size: contain;
  background-attachment: fixed;
  z-index: 2;
`;

const SecondLayerBg = styled.div`
  position: absolute;
  width: 100%;
  height: 115vh;
  background: url(${codePattern}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: 1;
`;

const HeaderBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 115vh;
  background: ${({ theme }) => theme.darkBlue};
  z-index: -1;
`;

const Header = () => {
  const firstLayerRef = useRef(null);
  const secondLayerRef = useRef(null);
  const secondLayerBgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const secondTitleRef = useRef(null);
  const secondSubtitleRef = useRef(null);
  const wrapperRef = useRef(null);

  const setOverflow = () => {
    document.body.style.overflow = "auto";
  };

  const controller = new ScrollMagic.Controller();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const firstLayer = firstLayerRef.current;
    const secondLayer = secondLayerRef.current;
    const secondLayerBg = secondLayerBgRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const secondTitle = secondTitleRef.current;
    const secondSubtitle = secondSubtitleRef.current;

    document.body.style.overflow = "hidden";

    gsap.set([secondLayer, title, subtitle], { autoAlpha: 0 });
    const tl = gsap.timeline({
      onComplete: setOverflow,
      defaults: { ease: "power3.inOut" },
    });
    const tl2 = gsap.timeline({ paused: true });

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
        secondLayer,
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
        firstLayer,
        {
          autoAlpha: 1,
        },
        {
          duration: 2,
          ease: "power4.in",
          autoAlpha: 0,
        },
        "-=2"
      )
      .fromTo(
        secondLayerBg,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          ease: "power4.in",
          autoAlpha: 0.4,
        },
        "-=1"
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
  });

  return (
    <Element name="home">
      <Wrapper ref={wrapperRef}>
        <Container>
          <FirsLayerImg ref={firstLayerRef} />
          <SecondLayerImg ref={secondLayerRef} />
          <SecondLayerBg ref={secondLayerBgRef} />
          <HeaderBackground />
          <Title ref={titleRef}>
            Hi, I'm <ColorSpan>Damian</ColorSpan>
          </Title>
          <Subtitle ref={subtitleRef}>I'm a front-end web developer</Subtitle>
          <SecondTitle ref={secondTitleRef}>
            I will turn your <ColorSpan>ideas</ColorSpan>
          </SecondTitle>
          <SecondSubtitle ref={secondSubtitleRef}>
            Into clean and effective <ColorSpan>code</ColorSpan>
          </SecondSubtitle>
        </Container>
      </Wrapper>
    </Element>
  );
};

export default Header;
