import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const FirstLayerImg = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        robotFace: file(relativePath: { eq: "header-1.png" }) {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.robotFace.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="div"
          className={className}
          fluid={imageData}
          backgroundColor={`transparent`}
        ></BackgroundImage>
      );
    }}
  />
);

export default FirstLayerImg;
