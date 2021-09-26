import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import aiIcon from "../../../assets/icons/ai.svg";
import chartjsIcon from "../../../assets/icons/chartjs.svg";
import contentfulIcon from "../../../assets/icons/contentful.svg";
import firebaseIcon from "../../../assets/icons/firebase.svg";
import gatsbyIcon from "../../../assets/icons/gatsby.svg";
import gsapIcon from "../../../assets/icons/gsap.svg";
import jestIcon from "../../../assets/icons/jest.svg";
import nextIcon from "../../../assets/icons/next.svg";
import olIcon from "../../../assets/icons/ol.svg";
import psIcon from "../../../assets/icons/ps.svg";
import reactIcon from "../../../assets/icons/react.svg";
import sassIcon from "../../../assets/icons/sass.svg";
import styledIcon from "../../../assets/icons/styled-components.svg";
import wpIcon from "../../../assets/icons/wp.svg";
import ListItem from "../../atoms/ListItem/ListItem";

const ListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 720px;
  ${({ theme }) => theme.mq.s} {
    justify-content: space-between;
    flex-direction: row;
  }
  ${({ theme }) => theme.mq.xl} {
    align-items: left;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 50px 0 0px;
}
`;

const ItemList = () => {
  const list1Ref = useRef(null);
  const list2Ref = useRef(null);

  useEffect(() => {
    const firstList = list1Ref.current;
    const secondList = list2Ref.current;

    if (firstList && secondList) {
      [...firstList.children, ...secondList.children].map(child => {
        gsap.from(child, {
          autoAlpha: 0,
          y: "-=20",
          scrollTrigger: {
            trigger: child,
            start: "top bottom-=50px",
          },
        });
      });
    }
  }, []);

  return (
    <ListsWrapper>
      <List ref={list1Ref}>
        <ListItem icon={reactIcon}>React</ListItem>
        <ListItem icon={nextIcon}>Next.js</ListItem>
        <ListItem icon={gatsbyIcon}>Gatsby</ListItem>
        <ListItem icon={jestIcon} height="22">
          Jest
        </ListItem>
        <ListItem icon={sassIcon}>Sass</ListItem>
        <ListItem icon={styledIcon} width="23" height="23">
          Styled Components
        </ListItem>
        <ListItem icon={gsapIcon} height="23">
          GSAP
        </ListItem>
      </List>
      <List ref={list2Ref}>
        <ListItem icon={olIcon}>Open Layers Maps</ListItem>
        <ListItem icon={chartjsIcon}>Chart.js</ListItem>
        <ListItem icon={contentfulIcon} width="17">
          Contentful
        </ListItem>
        <ListItem icon={firebaseIcon} height="28">
          Firebase
        </ListItem>
        <ListItem icon={psIcon} width="22" height="22">
          Adobe Photoshop
        </ListItem>
        <ListItem icon={aiIcon} width="22" height="22">
          Adobe Illustrator
        </ListItem>
        <ListItem icon={wpIcon}>WordPress</ListItem>
      </List>
    </ListsWrapper>
  );
};

export default ItemList;
