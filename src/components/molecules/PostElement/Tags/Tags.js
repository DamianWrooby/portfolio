import React from "react";
import styled from "styled-components";

import Tag from "./Tag/Tag";

const TagsContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Tags = ({ tags, lang }) => {
	return (
		<TagsContainer>
			{tags.map(tag => (
				<Tag key={tag} label={tag} lang={lang}></Tag>
			))}
		</TagsContainer>
	);
};

export default Tags;
