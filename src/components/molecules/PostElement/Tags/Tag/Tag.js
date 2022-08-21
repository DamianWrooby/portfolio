import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { tagColors } from "../../../../../consts/tag-colors";

const TagElement = styled.p`
	display: inline-block;
	min-width: 4rem;
	padding: 0.2rem 0.5rem;
	margin: 0 0.5rem 0 0;
	color: ${({ theme }) => theme.dark};
	border-radius: 0.2rem;
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.light};
	text-align: center;
`;

const Tag = ({ label, lang }) => {
	const formatedTag = label.replace(" ", "-").replace(".", "_");
	return (
		<Link to={`/${lang}/blog/tags/${formatedTag}`}>
			<TagElement
				style={{ backgroundColor: tagColors[label] || tagColors.default }}>
				{label}
			</TagElement>
		</Link>
	);
};

export default Tag;
