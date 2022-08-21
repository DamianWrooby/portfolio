import { MDXProvider } from "@mdx-js/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Seo from "../components/atoms/Seo/Seo";
import Separator from "../components/atoms/Separator/Separator";
import Footer from "../components/molecules/Footer/Footer";
import ToC from "../components/molecules/ToC/ToC";
import Comments from "../components/organisms/Comments/Comments";
import Navigation from "../components/organisms/Navigation/Navigation";
import NavigationProvider from "../contexts/NavigationContext";
import Layout from "../layouts/layout";
import { db } from "../services/firebase";
import CodeBlock from "../utils/CodeBlock";
import {
	ArticleContent,
	FeatureImageWrapper,
	HorizontalLine,
	PostHeader,
	Text,
} from "./styled-components";

const components = {
	pre: props => <div {...props} />,
	code: CodeBlock,
};

const BlogPost = ({ data }) => {
	const post = data.contentfulBlogPost;
	const id = data.contentfulBlogPost.contentfulid;
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "comments"), where("postId", "==", id));

		const unsubscribe = onSnapshot(q, querySnapshot => {
			const comments = [];
			querySnapshot.forEach(doc => {
				comments.push({ id: doc.id, ...doc.data() });
			});
			setComments(comments);
		});

		return () => unsubscribe();
	}, [id]);

	return (
		<NavigationProvider>
			<Layout>
				<Seo
					title={`${post.title} | Blog`}
					lang={post.language}
					image={post.image.file.url}
				/>
				<Navigation lang={post.language} />
				<main>
					<ArticleContent>
						<header>
							<PostHeader
								heading={post.title}
								paragraph={`${post.author} - ${post.date}`}
								tag="h1"
							/>
						</header>
						<Separator />
						<FeatureImageWrapper>
							<GatsbyImage
								image={post.image.gatsbyImageData}
								alt={post.title}
							/>
						</FeatureImageWrapper>
						<Text>
							<ToC
								headings={post.text.childMdx.tableOfContents.items}
								lang={post.language}
							/>
							<MDXProvider components={components}>
								<MDXRenderer>{post.text.childMdx.body}</MDXRenderer>
							</MDXProvider>
						</Text>
					</ArticleContent>
					<HorizontalLine />
					<Comments comments={comments} postId={id} lang={post.language} />
					<Footer lang={post.language} />
				</main>
			</Layout>
		</NavigationProvider>
	);
};

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!, $language: String!) {
		contentfulBlogPost(slug: { eq: $slug }) {
			contentfulid
			author
			date(formatString: "MMMM YYYY", locale: $language)
			excerpt
			image {
				file {
					url
				}
				gatsbyImageData(layout: FULL_WIDTH, quality: 100)
			}
			language
			tags
			title
			slug
			text {
				childMdx {
					body
					tableOfContents
				}
			}
		}
	}
`;

BlogPost.propTypes = {
	data: PropTypes.object.isRequired,
};

export default BlogPost;
