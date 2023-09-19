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

const IndexPage = ({ data }) => {
	useEffect(() => {
		if (typeof window !== undefined && !window.location.href.includes('#')) {
			window.scrollTo(0, 0);
		}
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
		.filter(post => post.props.postLanguage === 'en')
		.slice(0, 2);

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Programming portfolio" />
				<Navigation lang="en" />
				<Header lang="en" />
				<main>
					<AboutMe lang="en" />
					<Technologies lang="en" />
					<Blog posts={postsList} lang="en" />
					<Projects lang="en" />
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
