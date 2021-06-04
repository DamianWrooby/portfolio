import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
	width: 100%;
	${({ theme }) => theme.mq.xl} {
		margin: 25px 60px 0px 60px;
	}
`;

function PostElement({ key, title, author, excerpt, thumbnail, date }) {
	return (
		<article key={key}>
			<ImageWrapper>
				<GatsbyImage image={thumbnail} alt={title} />
			</ImageWrapper>
			<h2>{title}</h2>
			<small>
				{author}, {date}
			</small>
			<p>{excerpt}</p>
		</article>
	);
}

export default PostElement;
