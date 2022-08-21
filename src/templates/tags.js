import { graphql } from "gatsby";
import React from "react";

import Seo from "../components/atoms/Seo/Seo";
import Separator from "../components/atoms/Separator/Separator";
import Footer from "../components/molecules/Footer/Footer";
import PostElement from "../components/molecules/PostElement/PostElement";
import Navigation from "../components/organisms/Navigation/Navigation";
import NavigationProvider from "../contexts/NavigationContext";
import Layout from "../layouts/layout";
import {
	BlogHeader,
	InfoWrapper,
	PageTemplate,
	PostsSection,
	PostsWrapper,
} from "../templates/styled-components";

const Tags = ({ pageContext, data }) => {
	const { tag, language } = pageContext;
	const {
		allContentfulBlogPost: {
			edges: [...posts],
		},
	} = data;

	let postsList = posts.reverse();
	postsList = postsList.map(post => (
		<PostElement
			key={post.node.contentfulid}
			title={post.node.title}
			author={post.node.author}
			excerpt={post.node.excerpt}
			thumbnail={post.node.image.gatsbyImageData}
			date={post.node.date}
			slug={post.node.slug}
			language={language}
			postLanguage={post.node.language}
			tags={post.node.tags}
		/>
	));

	const metaDescription =
		language === "pl"
			? 'Strona zawierająca wszystkie posty z tagiem "' + tag + '"'
			: 'Page containing all posts tagged with "' + tag + '"';

	const metaTitle =
		language === "pl"
			? `Tag: ${tag} | Damian Wróblewski | Front-end Developer`
			: `Tag: ${tag} | Damian Wróblewski | Front-end Developer`;

	const noPostsInfo =
		language === "pl"
			? "Nie ma jeszcze żadnych wpisów blogowych z tym tagiem."
			: "No posts with this tag yet.";

	return (
		<NavigationProvider>
			<Layout>
				<Seo title={metaTitle} description={metaDescription} lang={language} />
				<Navigation lang={language} />
				<PageTemplate>
					<div>
						<BlogHeader heading={`Tag: ${tag}`} tag="h1" />
						<Separator />
						<main>
							<PostsSection>
								{postsList.length === 0 ? (
									<InfoWrapper>
										<p>{noPostsInfo}</p>
									</InfoWrapper>
								) : (
									<PostsWrapper>{postsList}</PostsWrapper>
								)}
							</PostsSection>
						</main>
					</div>
					<Footer lang={language} />
				</PageTemplate>
			</Layout>
		</NavigationProvider>
	);
};

export default Tags;

export const pageQuery = graphql`
	query ($tag: String, $language: String) {
		allContentfulBlogPost(filter: { tags: { eq: $tag } }) {
			edges {
				node {
					author
					excerpt
					date(formatString: "MMMM YYYY", locale: $language)
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
