import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Tag from "./Tag/Tag";

const TagsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;

const Tags = ({ tags, lang, isAnimated = false }) => {
	const tagListRef = useRef(null);

	useEffect(() => {
		const tagList = tagListRef.current;

		if (tagList && isAnimated) {
			gsap.from(tagList.children, {
				autoAlpha: 0,
				x: "-=1000",
				y: "-=100",
				stagger: 0.01,
			});
		}
	}, [isAnimated]);

	return (
		<TagsContainer ref={tagListRef}>
			{tags.map(tag => (
				<Tag key={tag} label={tag} lang={lang}></Tag>
			))}
		</TagsContainer>
	);
};

export default Tags;
