import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const PostsContainer = styled.article`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border: 2px solid #1e9898;
	border-radius: 20px;
	transition: all 0.2s ease;
	&&:hover {
		border: 2px solid #16ffff;
		transform: scale(1.02);
	}
`;

const ImageWrapper = styled.figure`
	width: 100%;
	object-fit: cover;
	${({ theme }) => theme.mq.xl} {
		margin: 25px 60px 0px 60px;
	}
`;

function PostElement({ title, author, excerpt, thumbnail, date }) {
	return (
		<PostsContainer>
			<ImageWrapper>
				<GatsbyImage image={thumbnail} alt={title} />
			</ImageWrapper>
			<h2>{title}</h2>
			<small>
				{author}, {date}
			</small>
			<p>{excerpt}</p>
		</PostsContainer>
	);
}

export default PostElement;
