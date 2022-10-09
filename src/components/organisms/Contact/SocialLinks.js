import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import emailIcon from "../../../assets/icons/email.svg";
import githubIcon from "../../../assets/icons/github.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import ListItem from "../../atoms/ListItem/ListItem";

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

const SocialLinks = ({ lang }) => {
	const listRef = useRef(null);

	useEffect(() => {
		const list = listRef.current;

		if (list) {
			[...list.children].forEach(child => {
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
			{lang === "en" && (
				<StyledParagraph>
					Take a look at my latest project on GitHub or follow me on Twitter if
					you enjoying web devlopment world stuff.
				</StyledParagraph>
			)}
			{lang === "pl" && (
				<StyledParagraph>
					Sprawdź moje projekty na GitHub lub śledź mnie na Twitterze jeśli
					interesują cię treści ze świata web developmentu.
				</StyledParagraph>
			)}
			<List ref={listRef}>
				<a
					href="mailto: dwroblewski89@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Email link">
					<StyledListItem icon={emailIcon} height="38" width="38" />
				</a>
				<a
					href="https://github.com/DamianWrooby"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Github link">
					<StyledListItem icon={githubIcon} height="38" width="38" />
				</a>
				<a
					href="https://twitter.com/DamianWrooby"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Twitter link">
					<StyledListItem icon={twitterIcon} height="38" width="38" />
				</a>
			</List>
		</Wrapper>
	);
};

export default SocialLinks;
