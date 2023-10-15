import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import listIcon from '../assets/images/favicon.png';
import Button from '../components/atoms/Button/Button';
import Seo from '../components/atoms/Seo/Seo';
import Footer from '../components/molecules/Footer/Footer';
import Navigation from '../components/organisms/Navigation/Navigation';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';
import { ArticleContent } from './styled-components';

const Wrapper = styled.article`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 50px;
	padding-bottom: 100px;
	${({ theme }) => theme.mq.xl} {
		padding-top: 100px;
	}
`;

const ImageWrapper = styled.figure`
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 20px;
	${({ theme }) => theme.mq.xs} {
		padding: 0 45px;
	}
`;

const ContentWrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 20px;
	${({ theme }) => theme.mq.xs} {
		padding: 0 45px;
	}
`;

const Title = styled.h3`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: 900;
	text-transform: uppercase;
	color: white;
	padding: 25px 0 25px 0;
`;

const Description = styled.div`
	font-family: ${({ theme }) => theme.fonts.subFont};
	font-size: ${({ theme }) => theme.fontSize.m};
	font-weight: ${({ theme }) => theme.light};
	color: ${({ theme }) => theme.lightGray};
	line-height: 1.5;
`;

const StyledImg = styled(GatsbyImage)`
	border-radius: 20px;
`;

const ListTitle = styled.h4`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: ${({ theme }) => theme.bold};
	color: ${({ theme }) => theme.white};
	padding: 40px 0 20px 0;
`;

const List = styled.ul`
	display: flex;
	flex-flow: row wrap;
	font-size: ${({ theme }) => theme.fontSize.s};
	color: ${({ theme }) => theme.white};
	list-style-type: none;
`;

const Item = styled.li`
	padding: 10px 15px 10px 0;
	&:before {
		content: '';
		display: inline-block;
		width: 20px;
		height: 10px;
		background: url(${listIcon}) no-repeat top center;
		background-size: 100%;
		margin-right: 7px;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	margin: 30px 0;
	justify-content: flex-start;
`;

const ProjectTemplate = ({ data }) => {
	const imageRef = useRef(null);
	const contentRef = useRef(null);
	const project = data.contentfulProject;
	const language = data.contentfulProject.language;
	const titleSufix = language === 'en' ? ' | Project' : ` | Projekt`;
	const technologies = project.technologies;
	const techList = technologies.map(el => {
		return <Item key={el}>{el}</Item>;
	});

	useEffect(() => {
		const image = imageRef.current;
		const content = contentRef.current;

		if (content && image) {
			gsap.from(image, {
				autoAlpha: 0,
				x: '-=150',
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=200px',
				},
			});
			gsap.from(content.children, {
				autoAlpha: 0,
				y: '-=50',
				duration: 0.5,
				stagger: 0.1,
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=200px',
				},
			});
		}
	}, []);

	return (
		<NavigationProvider>
			<Layout>
				<Seo
					title={`${project.title}${titleSufix}`}
					lang={language}
					image={project.screenshot.file.url}
				/>
				<Navigation lang={project.language} />
				<main>
					<ArticleContent>
						<Wrapper>
							<ImageWrapper ref={imageRef}>
								<StyledImg
									image={project.screenshot.gatsbyImageData}
									key={project.screenshot.file.url}
									alt={project.screenshot.title}
								/>
							</ImageWrapper>
							<ContentWrapper ref={contentRef}>
								<Title>{project.title}</Title>
								<Description>
									<MDXProvider>
										<MDXRenderer>
											{project.description.childMdx.body}
										</MDXRenderer>
									</MDXProvider>
								</Description>
								{language === 'en' && (
									<ListTitle>Technologies & Tools</ListTitle>
								)}
								{language === 'pl' && (
									<ListTitle>Technologie i narzędzia</ListTitle>
								)}
								<List>{techList}</List>
								<ButtonsWrapper>
									{language === 'en' && (
										<Button
											renderAs="a"
											label="Code"
											link={project.codeUrl}
											animated={false}
										/>
									)}
									{language === 'pl' && (
										<Button
											renderAs="a"
											label="Kod"
											link={project.codeUrl}
											animated={false}
										/>
									)}
									{project.liveDemoUrl && (
										<Button
											renderAs="a"
											label="Live Demo"
											link={project.liveDemoUrl}
											animated={true}
										/>
									)}
								</ButtonsWrapper>
							</ContentWrapper>
						</Wrapper>
					</ArticleContent>
					<Footer lang={language} />
				</main>
			</Layout>
		</NavigationProvider>
	);
};

export const pageQuery = graphql`
	query ProjectBySlug($slug: String!, $language: String!) {
		contentfulProject(slug: { eq: $slug }, language: { eq: $language }) {
			contentfulid
			title
			excerpt {
				excerpt
			}
			technologies
			codeUrl
			liveDemoUrl
			screenshot {
				file {
					url
				}
				title
				gatsbyImageData(layout: CONSTRAINED)
			}
			language
			description {
				childMdx {
					body
				}
			}
		}
	}
`;

ProjectTemplate.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ProjectTemplate;
