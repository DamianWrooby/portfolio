import { graphql } from 'gatsby';
import React from 'react';

import Seo from '../components/atoms/Seo/Seo';
import Separator from '../components/atoms/Separator/Separator';
import Filters from '../components/molecules/Filters/Filters';
import Footer from '../components/molecules/Footer/Footer';
import TagCloud from '../components/molecules/TagCloud/TagCloud';
import TileElement from '../components/molecules/TileElement/TileElement';
import Navigation from '../components/organisms/Navigation/Navigation';
import { initialFilters } from '../consts/filters';
import NavigationProvider from '../contexts/NavigationContext';
import useFilter from '../hooks/useFilter';
import Layout from '../layouts/layout';
import {
	BlogHeader,
	InfoWrapper,
	PageTemplate,
	PostsSection,
	PostsWrapper,
} from '../templates/styled-components';

const Tags = ({ pageContext, data }) => {
	const [filters, setFilters] = useFilter(initialFilters);

	const { tag, language } = pageContext;
	const {
		allContentfulBlogPost: { nodes: posts },
	} = data;

	const tags = [...new Set(posts.map(post => post.tags).flat())];

	let postsList = posts
		.filter(post => post.tags.includes(tag))
		.map(post => (
			<TileElement
				key={post.contentfulid}
				title={post.title}
				author={post.author}
				excerpt={post.excerpt}
				thumbnail={post.image.gatsbyImageData}
				date={post.date}
				url={`/${post.language}/blog/${post.slug}`}
				language={language}
				postLanguage={post.language}
				tags={post.tags}
			/>
		));

	filters.language !== 'all' &&
		(postsList = postsList.filter(
			post => post.props.postLanguage === filters.language
		));
	filters.sort === 'newest' && (postsList = postsList.reverse());

	const metaDescription =
		language === 'pl'
			? 'Strona zawierająca wszystkie posty z tagiem "' + tag + '"'
			: 'Page containing all posts tagged with "' + tag + '"';

	const metaTitle =
		language === 'pl'
			? `Tag: ${tag} | Damian Wróblewski | Frontend Developer`
			: `Tag: ${tag} | Damian Wróblewski | Frontend Developer`;

	const noPostsInfo =
		language === 'pl'
			? 'Nie ma jeszcze żadnych wpisów blogowych z tym tagiem.'
			: 'No posts with this tag yet.';

	return (
		<NavigationProvider>
			<Layout>
				<Seo title={metaTitle} description={metaDescription} lang={language} />
				<Navigation lang={language} />
				<PageTemplate>
					<div>
						<BlogHeader heading={`Tag: ${tag}`} tag="h1" />
						<Separator />
						<TagCloud tags={tags} lang={language} />
						<Filters
							lang={language}
							onFiltersChange={setFilters}
							filterValues={filters}
						/>
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
	query ($language: String) {
		allContentfulBlogPost {
			nodes {
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
`;
