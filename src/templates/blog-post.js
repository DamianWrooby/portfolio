import { collection, onSnapshot, query, where } from "firebase/firestore";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

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

// Extract h2/h3 headings from markdown and build the ToC item tree.
// Uses the same slug algorithm as rehype-slug (github-slugger-compatible).
function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
}

function extractToc(markdown) {
	const items = [];
	const headingRegex = /^(#{2,3})\s+(.+)$/gm;
	let match;
	while ((match = headingRegex.exec(markdown)) !== null) {
		const level = match[1].length;
		const title = match[2].trim();
		const url = `#${slugify(title)}`;
		if (level === 2) {
			items.push({ url, title, items: [] });
		} else if (level === 3 && items.length > 0) {
			items[items.length - 1].items.push({ url, title });
		}
	}
	return items;
}

const mdComponents = {
	pre: ({ children }) => <>{children}</>,
	code({ className, children }) {
		const isBlock = Boolean(className);
		if (!isBlock) return <code className={className}>{children}</code>;
		return <CodeBlock>{String(children).replace(/\n$/, "")}</CodeBlock>;
	},
};

const BlogPost = ({ data }) => {
	const post = data.contentfulBlogPost;
	const id = data.contentfulBlogPost.contentfulid;
	const rawMarkdown = post.text.text;
	const tocItems = extractToc(rawMarkdown);
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
							{tocItems.length > 0 && (
								<ToC headings={tocItems} lang={post.language} />
							)}
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeSlug]}
								components={mdComponents}
							>
								{rawMarkdown}
							</ReactMarkdown>
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
				text
			}
		}
	}
`;

BlogPost.propTypes = {
	data: PropTypes.object.isRequired,
};

export default BlogPost;
