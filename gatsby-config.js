require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: `Damian Wróblewski | Front-end Developer`,
		description: `Tech blog and programming portfolio built with Gatsby`,
		author: `@damianwrooby`,
		themeColor: `#16FFFF`,
		language: "en",
		keywords: [
			"frontend developer",
			"web developer",
			"web design",
			"react developer",
			"react programming",
		],
		siteUrl: "https://damianwroblewski.com/",
	},
	plugins: [
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-180186424-1",
				head: true,
				defer: false,
			},
		},
		`gatsby-plugin-react-helmet`,
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
		`gatsby-plugin-force-trailing-slashes`,
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
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#16FFFF`,
				theme_color: `#16FFFF`,
				display: `minimal-ui`,
				icon: `src/assets/images/favicon.png`,
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Sarala`, `source sans pro\:300,400,700`],
				display: "swap",
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `l8jq2db9qwuj`,
				accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				rehypePlugins: [require("rehype-slug")],
			},
		},
		{
			resolve: "gatsby-plugin-i18n",
			options: {
				langKeyDefault: "en",
				langKeyForNull: "en",
				useLangKeyLayout: false,
				prefixDefault: false,
			},
		},
		{
			resolve: `gatsby-plugin-disqus`,
			options: {
				shortname: `damianwroblewski`,
			},
		},
	],
};
