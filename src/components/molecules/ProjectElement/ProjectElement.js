import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.article`
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

const ProjectContent = styled.section`
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

const ProjectExcerpt = styled.p`
	color: ${({ theme }) => theme.lightGray};
	padding-bottom: 2rem;
	line-height: 1.5;
`;

const ProjectElement = ({ title, excerpt, thumbnail, slug, language }) => {
	const languagePath = `/${language}`;

	return (
		<ProjectContainer>
			<Header>
				<a href={`${languagePath}/projects/${slug}`}>
					<GatsbyImage image={thumbnail} alt={title} />
				</a>
			</Header>
			<ProjectContent>
				<a href={`${languagePath}/projects/${slug}`}>
					<h2>{title}</h2>
					<ProjectExcerpt>{excerpt}</ProjectExcerpt>
				</a>
			</ProjectContent>
		</ProjectContainer>
	);
};

ProjectElement.propTypes = {
	title: PropTypes.string.isRequired,
	excerpt: PropTypes.string.isRequired,
	thumbnail: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
};

export default ProjectElement;
