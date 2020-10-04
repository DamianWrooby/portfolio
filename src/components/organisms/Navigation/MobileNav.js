import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import Links from "./Links";
import styled, { css } from "styled-components";
import MenuBtn from "../Navigation/MenuBtn";
import { NavigationContext } from "../../../contexts/NavigationContext";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 11;
  ${({ theme }) => theme.mq.md} {
    display: none;
  }
`;

const Content = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: 0.3s;
  visibility: hidden;
  overflow: scroll;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 0;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 105vh;
  z-index: -1;
  background: linear-gradient(
    231deg,
    rgba(22, 35, 46, 1) 6%,
    rgba(23, 29, 34, 1) 87%
  );
  transform: translate(-20px, -115%);
  will-change: transform;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MobileNav = () => {
  const { handleMobileNav } = useContext(NavigationContext);
  const listRef = useRef(null);
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const btn = btnRef.current;
    const background = bgRef.current;
    const content = contentRef.current;

    if (list && btn && background && content) {
      const [button] = btn.children;
      const listItems = [...list.children];

      const close = () => {
        tl.reverse();
        handleMobileNav(false);
      };

      const handleClick = () => {
        tl.reversed() ? tl.play() : tl.reverse();
      };

      listItems.forEach(item => item.addEventListener("click", close));
      button.addEventListener("click", handleClick);

      const tl = gsap.timeline({
        defaults: { ease: "Power3.easeOut" },
        reversed: true,
      });

      tl.set(content, { visibility: "visible" });
      tl.to(background, {
        transform: "translate(-20px,-11%)",
        duration: 0.4,
        ease: " Circ.easeOut",
      });
      tl.addLabel("showItems");
      tl.from(listItems, { x: -50, autoAlpha: 0, stagger: 0.1 }, "showItems");
    }
  }, []);

  return (
    <Wrapper>
      <div ref={btnRef}>
        <MenuBtn />{" "}
      </div>
      <Background ref={bgRef} />
      <Content ref={contentRef}>
        <InnerWrapper>
          <List ref={listRef}>
            <Links />
          </List>
        </InnerWrapper>
      </Content>
    </Wrapper>
  );
};

export default MobileNav;
