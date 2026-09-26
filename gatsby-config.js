require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

// Shared with src/components/atoms/Seo/Seo.js, which cannot query GraphQL
// because it renders inside a Gatsby Head export.
const siteMetadata = require("./src/consts/siteMetadata");

module.exports = {
	siteMetadata,
	// Gatsby 5 default; set explicitly now that
	// gatsby-plugin-force-trailing-slashes is gone.
	trailingSlash: `always`,
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-image`,
		{
			resolve: "gatsby-plugin-netlify",
			options: {
				headers: {
					// Cache fonts forever
					"/fonts/*": [
						"Cache-Control: public",
						"Cache-Control: max-age=365000000",
						"Cache-Control: immutable",
					],
					// Cache images for a week
					"/images/*": [
						"Cache-Control: public",
						"Cache-Control: max-age=604800",
					],
				},
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `damianwroblewski.com`,
				short_name: `damianwroblewski.com`,
				start_url: `/`,
				background_color: `#16FFFF`,
				theme_color: `#16FFFF`,
				display: `minimal-ui`,
				icon: `src/assets/images/favicon.png`,
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `l8jq2db9qwuj`,
				accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
			},
		},
	],
};
