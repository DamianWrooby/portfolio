import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const SecondLayerBg = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        codePattern: file(relativePath: { eq: "code-pattern-o.jpg" }) {
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
      const imageData = data.codePattern.childImageSharp.fluid;
      return (
        <BackgroundImage
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
          Tag="div"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        ></BackgroundImage>
      );
    }}
  />
);

export default SecondLayerBg;
