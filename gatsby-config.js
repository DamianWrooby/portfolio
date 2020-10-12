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
    "gatsby-plugin-netlify",
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
        fonts: [`Sarala:400,700`, "Timmana: 400,700"],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `l8jq2db9qwuj`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
