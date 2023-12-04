import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Seo from '../components/atoms/Seo/Seo';
import Separator from '../components/atoms/Separator/Separator';
import Footer from '../components/molecules/Footer/Footer';
import SectionHeader from '../components/molecules/SectionHeader/SectionHeader';
import TileElement from '../components/molecules/TileElement/TileElement';
import Navigation from '../components/organisms/Navigation/Navigation';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';

const WebsitesSection = styled.section`
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

const WebsitesWrapper = styled.ul`
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

const WebsitesIndex = () => {
	const data = useStaticQuery(graphql`
		{
			allContentfulWebsite(sort: { fields: contentfulid }) {
				nodes {
					title
					description {
						description
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
		}
	`);

	const {
		allContentfulWebsite: { nodes: websites },
	} = data;

	const websiteList = websites
		.filter(website => website.language === 'pl')
		.map(website => (
			<TileElement
				key={website.slug}
				title={website.title}
				excerpt={website.description.description}
				thumbnail={website.screenshot.gatsbyImageData}
				url={`/${website.language}/websites/${website.slug}`}
				language={website.language}
			/>
		));

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Projekty stron internetowych | Damian Wróblewski | Frontend Developer" />
				<Navigation lang="pl" />
				<PageTemplate>
					<div>
						<PageHeader heading="Strony internetowe" tag="h1" />
						<Separator />
						<main>
							<WebsitesSection>
								{websiteList.length === 0 ? (
									<InfoWrapper>
										<p>Brak projektów do wyświetlenia</p>
									</InfoWrapper>
								) : (
									<WebsitesWrapper>{websiteList}</WebsitesWrapper>
								)}
							</WebsitesSection>
						</main>
					</div>
					<Footer lang="pl" />
				</PageTemplate>
			</Layout>
		</NavigationProvider>
	);
};

export default WebsitesIndex;
