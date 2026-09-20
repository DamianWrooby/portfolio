import PropTypes from 'prop-types';
import React from 'react';

import siteMetadata from '../../../consts/siteMetadata';

// Renders document metadata as plain elements, for use inside a Gatsby `Head`
// export:
//
//   export const Head = () => <Seo title="Blog" />;
//
// Gatsby hoists whatever `Head` returns into `<head>`, so this component
// deliberately uses no wrapper, no Helmet and no GraphQL query — `Head` runs
// outside the page render and cannot call `useStaticQuery`.
//
// `<html lang>` is NOT set here; the Head API cannot set html attributes, so
// gatsby-ssr.js owns it via `setHtmlAttributes`.
function Seo({ description = '', lang = 'en', meta = [], title, image: metaImage }) {
	const metaDescription = description || siteMetadata.description;

	// Contentful returns protocol-relative URLs (`//images.ctfassets.net/...`),
	// which are invalid in og:image — crawlers need an absolute URL.
	const absoluteImage = metaImage
		? metaImage.startsWith('//')
			? `https:${metaImage}`
			: metaImage
		: `${siteMetadata.siteUrl}${siteMetadata.previewImage}`;

	// Replaces react-helmet's `titleTemplate`, which the Head API has no
	// equivalent for. Pages pass the page-specific part only.
	const fullTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="theme-color" content={siteMetadata.themeColor} />
			<meta name="keywords" content={siteMetadata.keywords.join(',')} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:image" content={absoluteImage} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:type" content="website" />
			<meta property="og:locale" content={lang === 'pl' ? 'pl_PL' : 'en_US'} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={siteMetadata.author} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta
				name="google-site-verification"
				content={siteMetadata.googleSiteVerification}
			/>
			{meta.map(({ name, property, content }) => (
				<meta key={name || property} name={name} property={property} content={content} />
			))}
		</>
	);
}

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
};

export default Seo;
