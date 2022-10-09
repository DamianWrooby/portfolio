import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Tags from "../Tags/Tags";

const Wrapper = styled.div`
	margin: auto;
	max-width: 35rem;
	padding-bottom: 60px;
`;

const Label = styled.h2`
	color: ${({ theme }) => theme.lightGray};
	font-size: 1.5rem;
	font-weight: 300;
	margin-bottom: 1rem;
`;

const TagCloud = ({ tags, lang }) => {
	return (
		<Wrapper>
			<Label>
				{lang === "pl" ? "Szukaj wg tematów:" : "Search blog by topics:"}
			</Label>
			<Tags tags={tags} lang={lang} isAnimated />
		</Wrapper>
	);
};

TagCloud.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	lang: PropTypes.string.isRequired,
};

export default TagCloud;
