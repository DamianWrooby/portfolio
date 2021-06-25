import React, { useEffect, useState } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import useMedia from 'use-media';

const FirstLayerImg = ({ className }) => {
	const [
		bgSize,
		setBgSize
	] = useState('contain');

	const isWideScreen = useMedia({ minWidth: '1200px' });

	useEffect(
		() => {
			const size = isWideScreen ? 'contain' : 'cover';
			setBgSize(size);
		},
		[
			bgSize
		]
	);

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
			render={(data) => {
				const imageData = data.realFace.childImageSharp.fluid;

				return (
					<BackgroundImage
						style={{ backgroundSize: `${bgSize}`, backgroundPosition: 'left' }}
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
