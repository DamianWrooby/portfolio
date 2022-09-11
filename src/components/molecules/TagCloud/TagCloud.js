import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Tags from "../Tags/Tags";

const Wrapper = styled.div`
	margin: auto;
	max-width: 35rem;
	padding-bottom: 60px;
`;

const TagCloud = ({ tags, lang }) => {
	return (
		<Wrapper>
			<Tags tags={tags} lang={lang} isAnimated />
		</Wrapper>
	);
};

TagCloud.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	lang: PropTypes.string.isRequired,
};

export default TagCloud;
