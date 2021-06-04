import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../layouts/layout';
import Navigation from '../components/organisms/Navigation/Navigation';
import SectionHeader from '../components/molecules/SectionHeader/SectionHeader';
import Footer from '../components/molecules/Footer/Footer';
import Separator from '../components/atoms/Separator/Separator';
import NavigationProvider from '../contexts/NavigationContext';
import PostElement from '../components/molecules/PostElement/PostElement';
import styled from 'styled-components';

const PostsWrapper = styled.section`
	max-width: 1200px;
	margin: auto;
	display: flex;
	flex-direction: column;
	padding: 100px;
	${({ theme }) => theme.mq.xl} {
		flex-direction: row;
	}
`;
const BlogHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.xl} {
			padding: 220px 0 80px 0;
		}
	}
`;

const BlogIndex = () => {
	const data = useStaticQuery(graphql`
		{
			allContentfulBlogPost {
				edges {
					node {
						author
						excerpt
						date(fromNow: true)
						image {
							gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 400)
						}
						text {
							childMdx {
								body
							}
						}
						title
						contentfulid
					}
				}
			}
		}
	`);

	const {
		allContentfulBlogPost: {
			edges: [
				...posts
			]
		}
	} = data;

	const postsList = posts.map((post) => (
		<PostElement
			key={post.node.contentfulid}
			title={post.node.title}
			author={post.node.author}
			excerpt={post.node.excerpt}
			thumbnail={post.node.image.gatsbyImageData}
			date={post.node.date}
		/>
	));

	return (
		<NavigationProvider>
			<Layout>
				<Navigation />
				<BlogHeader heading="Blog" paragraph="Loerm aofjaepofj ae fe pjeaf a jep avjop ve vopjv" />
				<Separator />
				<main>
					<PostsWrapper>{postsList}</PostsWrapper>
				</main>
				<Footer />
			</Layout>
		</NavigationProvider>
	);
};

export default BlogIndex;
