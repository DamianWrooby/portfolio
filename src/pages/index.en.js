import { graphql } from 'gatsby';
import React, { useEffect } from 'react';

import Seo from '../components/atoms/Seo/Seo';
import Footer from '../components/molecules/Footer/Footer';
import PostElement from '../components/molecules/PostElement/PostElement';
import ProjectElement from '../components/molecules/ProjectElement/ProjectElement';
import AboutMe from '../components/organisms/AboutMe/AboutMe';
import BlogTiles from '../components/organisms/Blog/BlogTiles';
import Contact from '../components/organisms/Contact/Contact';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import ProjectTiles from '../components/organisms/Projects/ProjectTiles';
import Technologies from '../components/organisms/Technologies/Technologies';
import Websites from '../components/organisms/Websites/Websites';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';

const IndexPage = ({ data }) => {
	useEffect(() => {
		if (typeof window !== undefined && !window.location.href.includes('#')) {
			window.scrollTo(0, 0);
		}
	}, []);

	const {
		allContentfulBlogPost: { edges: posts },
		allContentfulProject: { nodes: projects },
	} = data;

	let postsList = posts
		.filter(post => post.node.language === 'en')
		.slice(0, 2)
		.map(post => (
			<PostElement
				key={post.node.contentfulid}
				title={post.node.title}
				author={post.node.author}
				excerpt={post.node.excerpt}
				thumbnail={post.node.image.gatsbyImageData}
				date={post.node.date}
				slug={post.node.slug}
				language={post.node.language}
				postLanguage={post.node.language}
				tags={post.node.tags}
			/>
		));

	let projectList = projects
		.filter(project => project.language === 'en')
		.slice(0, 2)
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
				<Seo title="Programming portfolio" />
				<Navigation lang="en" />
				<Header lang="en" />
				<main>
					<AboutMe lang="en" />
					<Technologies lang="en" />
					<BlogTiles posts={postsList} lang="en" />
					<ProjectTiles projects={projectList} lang="en" />
					<Websites lang="en" />
					<Contact lang="en" />
				</main>
				<Footer lang="en" />
			</Layout>
		</NavigationProvider>
	);
};

export const pageQuery = graphql`
	query {
		allContentfulBlogPost(sort: { fields: date, order: DESC }) {
			edges {
				node {
					author
					excerpt
					date(formatString: "MMMM YYYY", locale: "en")
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
	}
`;

export default IndexPage;
