import { graphql } from 'gatsby';
import React, { useEffect } from 'react';

import Seo from '../components/atoms/Seo/Seo';
import Footer from '../components/molecules/Footer/Footer';
import TileElement from '../components/molecules/TileElement/TileElement';
import AboutMe from '../components/organisms/AboutMe/AboutMe';
import BlogTiles from '../components/organisms/Blog/BlogTiles';
import Contact from '../components/organisms/Contact/Contact';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import ProjectTiles from '../components/organisms/Projects/ProjectTiles';
import Technologies from '../components/organisms/Technologies/Technologies';
import WebsiteTiles from '../components/organisms/Websites/WebsiteTiles';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';
import scrollTop from '../utils/scrollTop';

const IndexPage = ({ data }) => {
	useEffect(() => {
		scrollTop();
	}, []);

	const {
		allContentfulBlogPost: { nodes: posts },
		allContentfulProject: { nodes: projects },
		allContentfulWebsite: { nodes: websites },
	} = data;

	let postsList = posts
		.filter(post => post.language === 'pl')
		.slice(0, 2)
		.map(post => (
			<TileElement
				key={post.contentfulid}
				title={post.title}
				author={post.author}
				excerpt={post.excerpt}
				thumbnail={post.image.gatsbyImageData}
				date={post.date}
				url={`/${post.language}/blog/${post.slug}`}
				language={post.language}
				postLanguage={post.language}
				tags={post.tags}
			/>
		));

	let projectList = projects
		.filter(project => project.language === 'pl')
		.slice(0, 2)
		.map(project => (
			<TileElement
				key={project.contentfulid}
				title={project.title}
				excerpt={project.excerpt.excerpt}
				thumbnail={project.screenshot.gatsbyImageData}
				url={`/${project.language}/projects/${project.slug}`}
				language={project.language}
			/>
		));

	let websiteList = websites
		.filter(website => website.language === 'en')
		.slice(0, 2)
		.map(website => (
			<TileElement
				key={website.contentfulid}
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
				<Seo title="Portfolio programistyczne" lang="pl" />
				<Navigation lang="pl" />
				<Header lang="pl" />
				<main>
					<AboutMe lang="pl" />
					<Technologies lang="pl" />
					<BlogTiles posts={postsList} lang="pl" />
					<ProjectTiles projects={projectList} lang="pl" />
					<WebsiteTiles websites={websiteList} lang="pl" />
					<Contact lang="pl" />
				</main>
				<Footer lang="pl" />
			</Layout>
		</NavigationProvider>
	);
};

export const pageQuery = graphql`
	query {
		allContentfulBlogPost(sort: { fields: date, order: DESC }) {
			nodes {
				author
				excerpt
				date(formatString: "MMMM YYYY", locale: "pl")
				image {
					gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
				}
				title
				contentfulid
				language
				slug
				tags
			}
		}
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
`;

export default IndexPage;
