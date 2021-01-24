require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Damian Wróblewski | Front End Developer`,
    description: `Front End Developer portfolio made with Gatsby by Damian Wróblewski`,
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
    "gatsby-plugin-loadable-components-ssr",
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
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-180186424-1`,
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
        fonts: [
          `Sarala`,
          `source sans pro\:400,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
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
