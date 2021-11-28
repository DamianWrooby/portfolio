import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Header = styled.header`
	max-height: 230px;
	overflow: hidden;
`;

const PostContent = styled.section`
	padding: 3rem;
	&& h2 {
		color: ${({ theme }) => theme.white};
		font-size: ${({ theme }) => theme.fontSize.xl};
		font-weight: ${({ theme }) => theme.bold};
		padding-bottom: 2rem;
	}
`;

const PostExcerpt = styled.p`
	color: ${({ theme }) => theme.lightGray};
	padding-bottom: 2rem;
`;

const PostMeta = styled.p`color: #16ffff;`;

function PostElement({ title, author, excerpt, thumbnail, date, slug, language }) {
	const formattedDate = date.charAt(0).toUpperCase() + date.slice(1);
	const languagePath = `/${language}`;

	return (
		<PostsContainer>
			<a href={`${languagePath}/blog/${slug}`}>
				<Header>
					<GatsbyImage image={thumbnail} alt={title} />
				</Header>
				<PostContent>
					<h2>{title}</h2>
					<PostExcerpt>{excerpt}</PostExcerpt>
					<PostMeta>{formattedDate}</PostMeta>
				</PostContent>
			</a>
		</PostsContainer>
	);
}

PostElement.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string,
	excerpt: PropTypes.string.isRequired,
	thumbnail: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired
};

export default PostElement;
