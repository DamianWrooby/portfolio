import { StaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";

const SecondLayerImg = ({ className }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					robotFace: file(relativePath: { eq: "header-1.png" }) {
						childImageSharp {
							fluid(quality: 90) {
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
						style={{ backgroundPosition: "left" }}
						Tag="div"
						className={className}
						fluid={imageData}
						backgroundColor="transparent"></BackgroundImage>
				);
			}}
		/>
	);
};

export default SecondLayerImg;
