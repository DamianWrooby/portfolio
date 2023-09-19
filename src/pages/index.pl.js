import { graphql } from 'gatsby';
import React, { useEffect } from 'react';

import Seo from '../components/atoms/Seo/Seo';
import Footer from '../components/molecules/Footer/Footer';
import PostElement from '../components/molecules/PostElement/PostElement';
import AboutMe from '../components/organisms/AboutMe/AboutMe';
import Blog from '../components/organisms/Blog/Blog';
import Contact from '../components/organisms/Contact/Contact';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import Projects from '../components/organisms/Projects/Projects';
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
		allContentfulBlogPost: {
			edges: [...posts],
		},
	} = data;

	let postsList = posts
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
		))
		.filter(post => post.props.postLanguage === 'pl')
		.slice(0, 2);

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Portfolio programistyczne" lang="pl" />
				<Navigation lang="pl" />
				<Header lang="pl" />
				<main>
					<AboutMe lang="pl" />
					<Technologies lang="pl" />
					<Blog posts={postsList} lang="pl" />
					<Projects lang="pl" />
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
					text {
						childMdx {
							body
						}
					}
					title
					contentfulid
					language
					slug
					tags
				}
			}
		}
	}
`;

export default IndexPage;
