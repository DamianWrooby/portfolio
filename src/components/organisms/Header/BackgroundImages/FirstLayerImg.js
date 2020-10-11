import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const FirstLayerImg = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        realFace: file(relativePath: { eq: "first-layer.png" }) {
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
      const imageData = data.realFace.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="div"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        ></BackgroundImage>
      );
    }}
  />
);

export default FirstLayerImg;
