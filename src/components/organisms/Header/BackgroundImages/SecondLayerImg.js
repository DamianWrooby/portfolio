import React, { useEffect, useState } from "react";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import useMedia from "use-media";

const FirstLayerImg = ({ className }) => {
  const [bgSize, setBgSize] = useState("contain");

  const isWideScreen = useMedia({ minWidth: "1200px" });

  useEffect(() => {
    const size = isWideScreen ? "contain" : "cover";
    setBgSize(size);
    console.log(size);
  }, [bgSize]);

  return (
    <StaticQuery
      query={graphql`
        query {
          robotFace: file(relativePath: { eq: "header-1.png" }) {
            childImageSharp {
              fluid(pngQuality: 50) {
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
            style={{ backgroundSize: `${bgSize}`, backgroundPosition: "left" }}
            Tag="div"
            className={className}
            fluid={imageData}
            backgroundColor="transparent"
          ></BackgroundImage>
        );
      }}
    />
  );
};

export default FirstLayerImg;
