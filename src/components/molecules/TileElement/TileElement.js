import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import LanguageBadge from '../LanguageBadge/LanguageBadge';
import Tags from '../Tags/Tags';

const Container = styled.article`
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

const TileContent = styled.section`
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

const Excerpt = styled.p`
	color: ${({ theme }) => theme.lightGray};
	padding-bottom: 2rem;
	line-height: 1.5;
`;

const Date = styled.p`
	color: #16ffff;
`;

const Meta = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const TileElement = ({
	title,
	excerpt,
	thumbnail,
	url,
	language,
	date,
	postLanguage,
	author,
	tags,
}) => {
	const showMeta = tags && date;
	const showLanguageBadge = !!postLanguage;
	const formattedDate = date
		? date.charAt(0).toUpperCase() + date.slice(1)
		: null;
	const formattedTags = tags?.map(tag => tag.toLowerCase());

	return (
		<Container>
			<Header>
				<a href={url}>
					{showLanguageBadge && (
						<LanguageBadge lang={postLanguage || language} />
					)}
					<GatsbyImage image={thumbnail} alt={title} />
				</a>
			</Header>
			<TileContent>
				<a href={url}>
					<h2>{title}</h2>
					<Excerpt>{excerpt}</Excerpt>
				</a>
				{showMeta && (
					<Meta>
						<Date>{formattedDate}</Date>
						<Tags tags={formattedTags} lang={language} />
					</Meta>
				)}
			</TileContent>
		</Container>
	);
};

TileElement.propTypes = {
	title: PropTypes.string.isRequired,
	excerpt: PropTypes.string.isRequired,
	thumbnail: PropTypes.object.isRequired,
	url: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	date: PropTypes.string,
	postLanguage: PropTypes.string,
	author: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string),
};

export default TileElement;
