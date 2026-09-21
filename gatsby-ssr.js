const React = require('react');

// Contentful serves project, website and blog images straight from its CDN
// (images.ctfassets.net) rather than through gatsby-plugin-sharp, so the first
// one on a page pays DNS + TLS before any bytes move. Warming the connection in
// <head> overlaps that with HTML parsing.
//
// No `crossorigin`: these images are loaded as ordinary <img> without a
// crossorigin attribute, so a CORS-mode preconnect would open a second,
// unused connection instead of the one they need.
const CONTENTFUL_IMAGE_CDN = 'https://images.ctfassets.net';

exports.onRenderBody = ({
	pathname = '/',
	setHtmlAttributes,
	setHeadComponents,
}) => {
	// The Gatsby Head API cannot set attributes on <html>, so the document
	// language is set here instead. It used to come from react-helmet's
	// `htmlAttributes`.
	//
	// Language is derived from the URL because that is what gatsby-plugin-i18n
	// encodes: Polish pages are prefixed `/pl/`, English is the unprefixed
	// default (`prefixDefault: false`). Match the `/pl` segment exactly, so a
	// future path like `/planning/` is not mistaken for Polish.
	const isPolish = pathname === '/pl' || pathname.startsWith('/pl/');
	setHtmlAttributes({ lang: isPolish ? 'pl' : 'en' });

	setHeadComponents([
		React.createElement('link', {
			key: 'preconnect-contentful-images',
			rel: 'preconnect',
			href: CONTENTFUL_IMAGE_CDN,
		}),
		// Fallback for browsers that ignore preconnect.
		React.createElement('link', {
			key: 'dns-prefetch-contentful-images',
			rel: 'dns-prefetch',
			href: CONTENTFUL_IMAGE_CDN,
		}),
	]);
};
