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

const PostsSection = styled.section`
	color: ${({ theme }) => theme.lightGray};
	max-width: 1200px;
	margin: auto;
`;

const BlogHeader = styled(SectionHeader)`
	&& {
		padding: 120px 0 20px 0;
		${({ theme }) => theme.mq.md} {
			padding: 200px 0 20px 0;
		}
		${({ theme }) => theme.mq.xl} {
			padding: 250px 0 20px 0;
		}
	}
`;

const PostsWrapper = styled.ul`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 2rem;
	grid-gap: 2rem;
	padding: 2rem 3rem;
	${({ theme }) => theme.mq.md} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const InfoWrapper = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.lightGray};
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

	let postsList = posts.filter((post) => post.node.language === 'pl');
	postsList = postsList.map((post) => (
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
				<Navigation lang="pl" />
				<BlogHeader heading="Blog" />
				<Separator />
				<main>
					<PostsSection>
						{postsList.length === 0 ? (
							<InfoWrapper>
								<p>Nie ma jeszcze żadnych wpisów blogowych.</p>
							</InfoWrapper>
						) : (
							<PostsWrapper>{postsList}</PostsWrapper>
						)}
					</PostsSection>
				</main>
				<Footer lang="pl" />
			</Layout>
		</NavigationProvider>
	);
};

export default BlogIndex;
