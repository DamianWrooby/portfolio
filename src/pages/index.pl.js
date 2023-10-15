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
import scrollTop from '../utils/scrollTop';

const IndexPage = ({ data }) => {
	useEffect(() => {
		scrollTop();
	}, []);

	const {
		allContentfulBlogPost: { edges: posts },
		allContentfulProject: { nodes: projects },
	} = data;

	let postsList = posts
		.filter(post => post.node.language === 'pl')
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
		.filter(project => project.language === 'pl')
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
				<Seo title="Portfolio programistyczne" lang="pl" />
				<Navigation lang="pl" />
				<Header lang="pl" />
				<main>
					<AboutMe lang="pl" />
					<Technologies lang="pl" />
					<BlogTiles posts={postsList} lang="pl" />
					<ProjectTiles projects={projectList} lang="pl" />
					<Websites lang="pl" />
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
			edges {
				node {
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
