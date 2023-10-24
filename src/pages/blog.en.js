import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Seo from '../components/atoms/Seo/Seo';
import Separator from '../components/atoms/Separator/Separator';
import Filters from '../components/molecules/Filters/Filters';
import Footer from '../components/molecules/Footer/Footer';
import SectionHeader from '../components/molecules/SectionHeader/SectionHeader';
import TagCloud from '../components/molecules/TagCloud/TagCloud';
import TileElement from '../components/molecules/TileElement/TileElement';
import Navigation from '../components/organisms/Navigation/Navigation';
import { initialFilters } from '../consts/filters';
import NavigationProvider from '../contexts/NavigationContext';
import useFilter from '../hooks/useFilter';
import Layout from '../layouts/layout';

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
	padding: 2rem 3rem 4rem 3rem;
	${({ theme }) => theme.mq.md} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const InfoWrapper = styled.div`
	width: 100%;
	text-align: center;
	color: ${({ theme }) => theme.lightGray};
`;

const PageTemplate = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const BlogIndex = () => {
	const [filters, setFilters] = useFilter(initialFilters);

	const data = useStaticQuery(graphql`
		{
			allContentfulBlogPost(sort: { fields: date, order: ASC }) {
				nodes {
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
	`);

	const {
		allContentfulBlogPost: { nodes: posts },
	} = data;

	const tags = [...new Set(posts.map(post => post.tags).flat())];

	let postsList = posts.map(post => (
		<TileElement
			key={post.contentfulid}
			title={post.title}
			author={post.author}
			excerpt={post.excerpt}
			thumbnail={post.image.gatsbyImageData}
			date={post.date}
			url={`/${post.language}/blog/${post.slug}`}
			language="en"
			postLanguage={post.language}
			tags={post.tags}
		/>
	));

	filters.language !== 'all' &&
		(postsList = postsList.filter(
			post => post.props.postLanguage === filters.language
		));
	filters.sort === 'newest' && (postsList = postsList.reverse());

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Blog articles | Damian Wróblewski | Frontend Developer" />
				<Navigation lang="en" />
				<PageTemplate>
					<div>
						<BlogHeader heading="Blog" tag="h1" />
						<Separator />
						<TagCloud tags={tags} lang="en" />
						<Filters
							lang="en"
							onFiltersChange={setFilters}
							filterValues={filters}
						/>
						<main>
							<PostsSection>
								{postsList.length === 0 ? (
									<InfoWrapper>
										<p>There are no blog posts yet.</p>
									</InfoWrapper>
								) : (
									<PostsWrapper>{postsList}</PostsWrapper>
								)}
							</PostsSection>
						</main>
					</div>
					<Footer lang="pl" />
				</PageTemplate>
			</Layout>
		</NavigationProvider>
	);
};

export default BlogIndex;
