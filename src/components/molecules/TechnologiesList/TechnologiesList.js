import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ListItem from "../../atoms/ListItem/ListItem";
import htmlIcon from "../../../assets/icons/html-5.svg";
import cssIcon from "../../../assets/icons/css-3.svg";
import javaScriptIcon from "../../../assets/icons/javascript.svg";
import reactIcon from "../../../assets/icons/react.svg";
import reduxIcon from "../../../assets/icons/redux.svg";
import gatsbyIcon from "../../../assets/icons/gatsby.svg";
import jestIcon from "../../../assets/icons/jest.svg";
import rtlIcon from "../../../assets/icons/rtl.svg";
import gsapIcon from "../../../assets/icons/gsap.svg";
import sassIcon from "../../../assets/icons/sass.svg";
import styledIcon from "../../../assets/icons/styled-components.svg";
import formikIcon from "../../../assets/icons/formik.svg";
import gitIcon from "../../../assets/icons/git.svg";
import olIcon from "../../../assets/icons/ol.svg";
import chartjsIcon from "../../../assets/icons/chartjs.svg";
import contentfulIcon from "../../../assets/icons/contentful.svg";
import firebaseIcon from "../../../assets/icons/firebase.svg";
import psIcon from "../../../assets/icons/ps.svg";
import aiIcon from "../../../assets/icons/ai.svg";
import wpIcon from "../../../assets/icons/wp.svg";
import figmaIcon from "../../../assets/icons/figma.svg";

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
        <ListItem icon={htmlIcon} height="28">
          HTML 5
        </ListItem>
        <ListItem icon={cssIcon} height="28">
          CSS 3
        </ListItem>
        <ListItem icon={javaScriptIcon}>JavaScript ES 6+</ListItem>
        <ListItem icon={reactIcon}>React & Hooks</ListItem>
        <ListItem icon={reduxIcon}>Redux</ListItem>
        <ListItem icon={gatsbyIcon}>Gatsby</ListItem>
        <ListItem icon={jestIcon} height="22">
          Jest
        </ListItem>
        <ListItem icon={rtlIcon} Icon>
          React Testing Library
        </ListItem>
        <ListItem icon={cssIcon} height="28">
          CSS Modules
        </ListItem>
        <ListItem icon={sassIcon}>Sass</ListItem>
        <ListItem icon={styledIcon} width="23" height="23">
          Styled Components
        </ListItem>
      </List>
      <List ref={list2Ref}>
        <ListItem icon={gsapIcon} height="23">
          GSAP
        </ListItem>
        <ListItem icon={formikIcon} width="24" height="22">
          Formik
        </ListItem>
        <ListItem icon={gitIcon}>Git</ListItem>
        <ListItem icon={olIcon}>Open Layers</ListItem>
        <ListItem icon={chartjsIcon}>Chart.js</ListItem>
        <ListItem icon={contentfulIcon} width="17">
          Contentful
        </ListItem>
        <ListItem icon={firebaseIcon} height="28">
          Firebase
        </ListItem>
        <ListItem icon={figmaIcon} width="15" height="23">
          Figma
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
