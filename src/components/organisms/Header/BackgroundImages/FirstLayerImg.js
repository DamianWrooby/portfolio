import { StaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";

const FirstLayerImg = ({ className }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					realFace: file(relativePath: { eq: "first-layer.png" }) {
						childImageSharp {
							fluid(quality: 90) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			`}
			render={data => {
				const imageData = data.realFace.childImageSharp.fluid;

				return (
					<BackgroundImage
						style={{ backgroundPosition: "left" }}
						Tag="div"
						className={className}
						fluid={imageData}
						backgroundColor={`transparent`}
					/>
				);
			}}
		/>
	);
};

export default FirstLayerImg;
