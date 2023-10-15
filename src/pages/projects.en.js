import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Seo from '../components/atoms/Seo/Seo';
import Separator from '../components/atoms/Separator/Separator';
import Footer from '../components/molecules/Footer/Footer';
import ProjectElement from '../components/molecules/ProjectElement/ProjectElement';
import SectionHeader from '../components/molecules/SectionHeader/SectionHeader';
import Navigation from '../components/organisms/Navigation/Navigation';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';

const ProjectsSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

const PageHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.md} {
			padding: 200px 0 20px 0;
		}
		${({ theme }) => theme.mq.xl} {
			padding: 250px 0 20px 0;
		}
	}
`;

const ProjectsWrapper = styled.ul`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 2rem;
	grid-gap: 2rem;
	padding: 2rem 3rem 4rem 3rem;
	${({ theme }) => theme.mq.md} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const InfoWrapper = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.lightGray};
`;

const PageTemplate = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ProjectsIndex = () => {
	const data = useStaticQuery(graphql`
		{
			allContentfulProject(sort: { fields: contentfulid }) {
				nodes {
					contentfulid
					language
					technologies
					title
					screenshot {
						gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
					}
					excerpt {
						excerpt
					}
					slug
				}
			}
		}
	`);

	const {
		allContentfulProject: { nodes: projects },
	} = data;

	let fullProjectList = projects
		.filter(project => project.language === 'en')
		.map(project => (
			<ProjectElement
				key={project.contentfulid}
				title={project.title}
				excerpt={project.excerpt.excerpt}
				thumbnail={project.screenshot.gatsbyImageData}
				slug={project.slug}
				language={project.language}
			/>
		));

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Side projects | Damian Wróblewski | Frontend Developer" />
				<Navigation lang="en" />
				<PageTemplate>
					<div>
						<PageHeader heading="Side projects" tag="h1" />
						<Separator />
						<main>
							<ProjectsSection>
								{fullProjectList.length === 0 ? (
									<InfoWrapper>
										<p>There are no prjects to display</p>
									</InfoWrapper>
								) : (
									<ProjectsWrapper>{fullProjectList}</ProjectsWrapper>
								)}
							</ProjectsSection>
						</main>
					</div>
					<Footer lang="pl" />
				</PageTemplate>
			</Layout>
		</NavigationProvider>
	);
};

export default ProjectsIndex;
