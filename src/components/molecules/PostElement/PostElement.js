import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Tags from "../Tags/Tags";
import LanguageBadge from "./LanguageBadge/LanguageBadge";

const PostsContainer = styled.article`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border: 2px solid #1e9898;
	border-radius: 20px;
	transition: all 0.2s ease;
	&&:hover {
		${({ theme }) => theme.mq.md} {
			border: 2px solid #16ffff;
			transform: scale(1.02);
		}
	}
`;

const Header = styled.header`
	max-height: 230px;
	overflow: hidden;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
`;

const PostContent = styled.section`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: space-between;
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

const Date = styled.p`
	color: #16ffff;
`;

const PostMeta = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const PostElement = ({
	title,
	author,
	excerpt,
	thumbnail,
	date,
	slug,
	language,
	postLanguage,
	tags,
}) => {
	const formattedDate = date.charAt(0).toUpperCase() + date.slice(1);
	const languagePath = `/${postLanguage}`;
	const formatedTags = tags.map(tag => tag.toLowerCase());

	return (
		<PostsContainer>
			<Header>
				<a href={`${languagePath}/blog/${slug}`}>
					<LanguageBadge lang={postLanguage || language} />
					<GatsbyImage image={thumbnail} alt={title} />
				</a>
			</Header>
			<PostContent>
				<a href={`${languagePath}/blog/${slug}`}>
					<h2>{title}</h2>
					<PostExcerpt>{excerpt}</PostExcerpt>
				</a>
				<PostMeta>
					<Date>{formattedDate}</Date>
					{tags && <Tags tags={formatedTags} lang={language} />}
				</PostMeta>
			</PostContent>
		</PostsContainer>
	);
};

PostElement.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string,
	excerpt: PropTypes.string.isRequired,
	thumbnail: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
};

export default PostElement;
