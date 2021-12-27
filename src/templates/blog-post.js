import { MDXProvider } from "@mdx-js/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Content from "../components/atoms/Content/Content";
import Seo from "../components/atoms/Seo/Seo";
import Separator from "../components/atoms/Separator/Separator";
import Footer from "../components/molecules/Footer/Footer";
import SectionHeader from "../components/molecules/SectionHeader/SectionHeader";
import ToC from "../components/molecules/ToC/ToC";
import Comments from "../components/organisms/Comments/Comments";
import Navigation from "../components/organisms/Navigation/Navigation";
import NavigationProvider from "../contexts/NavigationContext";
import Layout from "../layouts/layout";
import { db } from "../services/firebase";
import CodeBlock from "../utils/CodeBlock";

const ArticleContent = styled.article`
	max-width: ${({ theme }) => theme.articleContainerWidth};
	margin: auto;
`;

const PostHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.md} {
			padding: 200px 0 20px 0;
		}
		${({ theme }) => theme.mq.xl} {
			padding: 250px 0 20px 0;
		}
		p {
			width: 100%;
			text-align: center;
		}
		h1 {
			font-size: ${({ theme }) => theme.fontSize.lg};
			${({ theme }) => theme.mq.md} {
				font-size: ${({ theme }) => theme.fontSize.xxl};
			}
		}
	}
`;

const Text = styled(Content)`
	&& {
		font-family: ${({ theme }) => theme.fonts.subFont};
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.regular};
		color: ${({ theme }) => theme.lightGray};
		line-height: 1.5;
		margin: 7rem 0;
	}
	img {
		max-width: 100%;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Sarala", sans-serif;
		font-weight: ${({ theme }) => theme.bold};
		color: ${({ theme }) => theme.white};
		padding: 20px 0;
	}
	h2 {
		font-size: 3.2rem;
	}
	h3 {
		font-size: 2.8rem;
	}
	ul {
		padding-left: 2rem;
		list-style-type: circle;
	}
	p {
		padding-bottom: 30px;
		text-align: justify;
		line-height: 1.3;
	}
	em {
		font-style: italic;
	}
`;

const FeatureImageWrapper = styled.figure`
	max-height: 500px;
	overflow: hidden;
	padding: 0 15px;
	${({ theme }) => theme.mq.md} {
		padding: 0 45px;
	}
`;

const HorizontalLine = styled.hr`
	background-color: ${({ theme }) => theme.lightGray};
	height: 1px;
	max-width: calc(${({ theme }) => theme.articleContainerWidth} - 30px);
	${({ theme }) => theme.mq.md} {
		max-width: calc(${({ theme }) => theme.articleContainerWidth} - 90px);
	}
	margin: 2rem auto;
`;

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
			console.log(`All comments for post ID: ${id}`, comments);
			setComments(comments);
		});

		return () => unsubscribe();
	}, [id]);

	return (
		<NavigationProvider>
			<Layout>
				<Seo title={`${post.title} | Blog`} lang={post.language} />
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
