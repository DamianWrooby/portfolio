// Single source of truth for site metadata.
//
// This is a plain module rather than a GraphQL `siteMetadata` query because the
// Gatsby Head API cannot call `useStaticQuery`, and every consumer of this data
// (the `Seo` atom) now runs inside a `Head` export.
// `gatsby-config.js` requires this file so the GraphQL layer stays in sync.
const siteMetadata = {
	title: 'Damian Wróblewski | Frontend Developer',
	description: 'Tech Blog, Coding Projects & Web Development Showcase',
	author: '@damianwrooby',
	themeColor: '#16FFFF',
	language: 'en',
	keywords: [
		'frontend developer',
		'web developer',
		'web design',
		'react developer',
		'react programming',
	],
	siteUrl: 'https://damianwroblewski.com/',
	// Served straight from `static/`, so the URL is stable and needs no image
	// transform. Previously a `fluid(maxWidth: 1280)` query, which the Head API
	// cannot run.
	previewImage: 'preview.png',
	googleSiteVerification: 'g8Rk4od0pwwvsr8uyAce569jOBDAjJZauJ-EhIP93s4',
};

module.exports = siteMetadata;
