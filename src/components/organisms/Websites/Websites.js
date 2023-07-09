import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Element } from 'react-scroll';
import styled from 'styled-components';

import Content from '../../atoms/Content/Content';
import Separator from '../../atoms/Separator/Separator';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import Website from '../Websites/Website';

const Wrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.dark};
  min-height: 100vh;
  margin-top: 40px;
  ${({ theme }) => theme.mq.xxl} {
    margin-top: 100px;
  }
  }
`;

const Main = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	flex-direction: column;
	color: ${({ theme }) => theme.white};
	${({ theme }) => theme.mq.md} {
		padding: 20px 0 0;
	}
	${({ theme }) => theme.mq.xxl} {
		padding: 20px 0 0;
	}
`;

const InnerWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: -25px;
`;

const WaveWrapper = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	margin-top: 90px;
`;

const wavePath = (
	<WaveWrapper>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path
				fill="#03131D"
				fillOpacity="1"
				d="M0,64L720,96L1440,32L1440,0L720,0L0,0Z"
			/>
		</svg>
	</WaveWrapper>
);

const Websites = ({ lang }) => {
	const data = useStaticQuery(graphql`
		{
			allContentfulWebsite(sort: { fields: contentfulid }) {
				edges {
					node {
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
					}
				}
			}
		}
	`);

	const {
		allContentfulWebsite: {
			edges: [...websites],
		},
	} = data;

	let websitesList = websites.filter(website => website.node.language === lang);
	websitesList = websitesList.map(website => (
		<Website
			lang={lang}
			key={website.node.title}
			title={website.node.title}
			technologies={website.node.technologies}
			description={website.node.description.description}
			image={website.node.screenshot.gatsbyImageData}
			imgKey={website.node.screenshot.file.url}
			imgAlt={website.node.title}
			websiteUrl={website.node.websiteUrl}
			scopeOfWork={website.node.scopeOfWork}
			fullScreenshotUrl={website.node.fullScreenshot.file.url}
		/>
	));

	return (
		<Wrapper id="websites">
			<Element name="websites">
				<Content>
					<Main>
						<Separator />
						{lang === 'en' && (
							<SectionHeader
								heading="Websites"
								paragraph={
									<span>
										In addition to web applications, I also create website
										designs for companies.
										<br />
										Here are some of them.
									</span>
								}
							/>
						)}
						{lang === 'pl' && (
							<SectionHeader
								heading="Strony internetowe"
								paragraph="Poza aplikacjami webowymi, tworzę również projekty stron internetowych dla firm.<br/>Poniżej niektóre z nich."
							/>
						)}
						<InnerWrapper>{websitesList}</InnerWrapper>
					</Main>
				</Content>
				{wavePath}
			</Element>
		</Wrapper>
	);
};

export default Websites;
