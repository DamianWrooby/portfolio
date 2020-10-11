import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ListItem from "../../atoms/ListItem/ListItem";
import twitterIcon from "../../../assets/icons/twitter.svg";
import emailIcon from "../../../assets/icons/email.svg";
import githubIcon from "../../../assets/icons/github.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 100px;
  ${({ theme }) => theme.mq.xl} {
    margin-bottom: 0;
    margin-top: 50px;
  }
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
`;

const StyledListItem = styled(ListItem)`
  && {
    min-width: unset;
    &:hover {
      filter: drop-shadow(0 0 10px rgba(84, 227, 255, 0.7));
    }
  }
`;

const StyledParagraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.gray};
  text-align: center;
  line-height: 1.3;
  margin-bottom: 50px;
`;

const ItemList = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      [...list.children].map(child => {
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
    <Wrapper>
      <StyledParagraph>
        Take a look at my latest project on GitHub or follow me on Twitter if
        you enjoying web devlopment world stuff.
      </StyledParagraph>
      <List ref={listRef}>
        <a
          href="mailto: dwroblewski89@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledListItem
            icon={emailIcon}
            height="38"
            width="38"
          ></StyledListItem>
        </a>
        <a
          href="https://github.com/DamianWrooby"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledListItem
            icon={githubIcon}
            height="38"
            width="38"
          ></StyledListItem>
        </a>
        <a
          href="https://twitter.com/DamianWrooby"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledListItem
            icon={twitterIcon}
            height="38"
            width="38"
          ></StyledListItem>
        </a>
      </List>
    </Wrapper>
  );
};

export default ItemList;
