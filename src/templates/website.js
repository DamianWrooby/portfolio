import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
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

const StyledImg = styled(GatsbyImage)`
	border-radius: 20px;
`;

const ListsContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	margin-bottom: 70px;
`;

const ListsWrapper = styled.div`
	display: flex;
	flex-flow: column wrap;
	margin-right: 60px;
`;

const ListTitle = styled.h4`
	font-family: ${({ theme }) => theme.fonts.mainFont};
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: ${({ theme }) => theme.bold};
	color: white;
	padding: 40px 0 20px 0;
`;

const List = styled.ul`
	display: flex;
	flex-flow: row wrap;
	font-size: ${({ theme }) => theme.fontSize.s};
	color: ${({ theme }) => theme.white};
	list-style-type: none;
`;

const ScopeList = styled.ul`
	display: flex;
	flex-flow: column wrap;
	margin-left: 20px;
	font-size: ${({ theme }) => theme.fontSize.xs};
	color: ${({ theme }) => theme.gray};
	list-style-type: none;
`;

const ScopeItem = styled.li`
	padding: 5px 15px 5px 0;
	list-style-type: initial;
`;

const TechItem = styled.li`
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

const WebsiteTemplate = ({ data }) => {
	const imageRef = useRef(null);
	const contentRef = useRef(null);
	const website = data.contentfulWebsite;
	const language = website.language;
	const titleSufix =
		language === 'en' ? ' | Web design' : ` | Projekt strony internetowej`;

	const scopeList = website.scopeOfWork.map(el => {
		return <ScopeItem key={el}>{el}</ScopeItem>;
	});

	const techList = website.technologies.map(el => {
		return <TechItem key={el}>{el}</TechItem>;
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
					title={`${website.title}${titleSufix}`}
					lang={language}
					image={website.screenshot.file.url}
				/>
				<Navigation lang={website.language} />
				<main>
					<ArticleContent>
						<Wrapper>
							<ImageWrapper ref={imageRef}>
								<StyledImg
									image={website.screenshot.gatsbyImageData}
									key={website.screenshot.file.url}
									alt={website.description.description}
								/>
							</ImageWrapper>
							<ContentWrapper ref={contentRef}>
								<Title>{website.title}</Title>
								<ListsContainer>
									<ListsWrapper>
										{language === 'en' && <ListTitle>Technologies</ListTitle>}
										{language === 'pl' && <ListTitle>Technologie</ListTitle>}
										<List>{techList}</List>
									</ListsWrapper>
									<ListsWrapper>
										{language === 'en' && <ListTitle>Scope of work</ListTitle>}
										{language === 'pl' && <ListTitle>Zakres prac</ListTitle>}
										<ScopeList>{scopeList}</ScopeList>
									</ListsWrapper>
								</ListsContainer>
								<ButtonsWrapper>
									{website.fullScreenshot.file.url && (
										<Button
											renderAs="a"
											label="Screenshot"
											title="Screenshot"
											link={website.fullScreenshot.file.url}
											animated={false}
										/>
									)}
									{website.websiteUrl === ' ' ? null : (
										<Button
											renderAs="a"
											label="Live"
											title="Live"
											link={website.websiteUrl}
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
	query WebsiteBySlug($slug: String!, $language: String!) {
		contentfulWebsite(slug: { eq: $slug }, language: { eq: $language }) {
			title
			description {
				description
			}
			technologies
			scopeOfWork
			websiteUrl
			fullScreenshot {
				file {
					url
				}
			}
			screenshot {
				file {
					url
				}
				gatsbyImageData(layout: CONSTRAINED)
			}
			language
			slug
		}
	}
`;

WebsiteTemplate.propTypes = {
	data: PropTypes.object.isRequired,
};

export default WebsiteTemplate;
