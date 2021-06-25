import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Seo({ description, lang, meta, title, image: metaImage }) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						themeColor
						keywords
						siteUrl
					}
				}
			}
		`
	);

	const metaDescription = description || site.siteMetadata.description;

	const image = metaImage && metaImage.src ? `${site.siteMetadata.siteUrl}${metaImage.src}` : null;

	return (
		<Helmet
			htmlAttributes={{
				lang
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription
				},
				{
					name: `theme-color`,
					content: site.siteMetadata.themeColor
				},
				{
					name: 'keywords',
					content: site.siteMetadata.keywords.join(',')
				},
				{
					property: `og:title`,
					content: title
				},
				{
					property: 'og:image',
					content: image
				},
				{
					property: `og:description`,
					content: metaDescription
				},
				{
					property: `og:type`,
					content: `website`
				},
				{
					property: `og:image`,
					content: image
				},
				{
					name: `twitter:card`,
					content: `summary`
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author
				},
				{
					name: `twitter:title`,
					content: title
				},
				{
					name: `twitter:description`,
					content: metaDescription
				},
				{
					name: `google-site-verification`,
					content: `g8Rk4od0pwwvsr8uyAce569jOBDAjJZauJ-EhIP93s4`
				}
			].concat(meta)}
		/>
	);
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``
};

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
	image: PropTypes.shape({
		src: PropTypes.string.isRequired
	})
};

export default Seo;
