import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

// Decorative backdrop revealed by the header scroll timeline.
//
// Note: the styled wrapper in Header.js used `background-attachment: fixed`,
// which only applies to CSS background images. GatsbyImage renders an <img>,
// so that declaration no longer has an effect here.
const SecondLayerBg = ({ className }) => {
	const data = useStaticQuery(graphql`
		query {
			codePattern: file(relativePath: { eq: "code-pattern-o.jpg" }) {
				childImageSharp {
					gatsbyImageData(
						quality: 90
						layout: FULL_WIDTH
						placeholder: NONE
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	`);

	const image = getImage(data.codePattern);

	return (
		<GatsbyImage
			className={className}
			image={image}
			alt=""
			role="presentation"
			loading="eager"
			objectFit="cover"
			objectPosition="center"
			style={{ width: '100%', height: '100%', backgroundColor: '#040e18' }}
		/>
	);
};

export default SecondLayerBg;
