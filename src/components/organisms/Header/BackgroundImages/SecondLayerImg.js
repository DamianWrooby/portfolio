import { StaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React, { useCallback, useEffect, useState } from "react";
import useMedia from "use-media";

import debounce from "../../../../utils/debounce";

const SecondLayerImg = ({ className }) => {
	const [bgSize, setBgSize] = useState("contain");
	const isWideScreen = useMedia({ minWidth: "1200px" });

	const setBackground = useCallback(
		debounce(() => {
			const size = isWideScreen ? "contain" : "cover";
			setBgSize(size);
		}, 100),
		[isWideScreen]
	);

	useEffect(() => {
		setBackground();
	}, [bgSize]);

	useEffect(() => {
		window.addEventListener("resize", setBackground);
		return () => window.removeEventListener("resize", setBackground);
	}, [setBackground]);

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
						style={{ backgroundSize: `${bgSize}`, backgroundPosition: "left" }}
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
