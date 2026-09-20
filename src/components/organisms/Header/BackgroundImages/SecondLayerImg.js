import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useCallback, useEffect, useState } from 'react';
import useMedia from 'use-media';

import debounce from '../../../../utils/debounce';

// Revealed by the header scroll timeline, so it must be decoded before the
// animation runs rather than lazily on scroll.
const SecondLayerImg = ({ className }) => {
	const [objectFit, setObjectFit] = useState('contain');
	const isWideScreen = useMedia({ minWidth: '1200px' });

	const setBackground = useCallback(
		debounce(() => {
			setObjectFit(isWideScreen ? 'contain' : 'cover');
		}, 100),
		[isWideScreen]
	);

	useEffect(() => {
		setBackground();
	}, [objectFit]);

	useEffect(() => {
		window.addEventListener('resize', setBackground);
		return () => window.removeEventListener('resize', setBackground);
	}, [setBackground]);

	const data = useStaticQuery(graphql`
		query {
			robotFace: file(relativePath: { eq: "header-1.png" }) {
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

	const image = getImage(data.robotFace);

	return (
		<GatsbyImage
			className={className}
			image={image}
			alt=""
			role="presentation"
			loading="eager"
			objectFit={objectFit}
			objectPosition="left"
			style={{ width: '100%', height: '100%' }}
		/>
	);
};

export default SecondLayerImg;
