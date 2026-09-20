import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useCallback, useEffect, useState } from 'react';
import useMedia from 'use-media';

import debounce from '../../../../utils/debounce';

// Hero layer, so it is the LCP element: loaded eagerly and never lazy.
// Unlike the other two layers this uses a BLURRED placeholder: GatsbyImage
// ships the real <img> at opacity 0 and reveals it from JS, so with
// placeholder: NONE nothing at all painted here until hydration. The blurred
// base64 is inlined in the SSR HTML and paints with no JS. The other layers
// keep NONE because GSAP holds them at opacity 0 until the scroll scene runs,
// long after JS has loaded, so a placeholder there is only wasted bytes.
// Migrated off gatsby-background-image (unmaintained, declares gatsby ^2-^4).
// The old `backgroundSize` now drives `objectFit` on the underlying <img>.
const FirstLayerImg = ({ className }) => {
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
			realFace: file(relativePath: { eq: "first-layer.png" }) {
				childImageSharp {
					gatsbyImageData(
						quality: 90
						layout: FULL_WIDTH
						placeholder: BLURRED
						formats: [AUTO, WEBP, AVIF]
					)
				}
			}
		}
	`);

	const image = getImage(data.realFace);

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

export default FirstLayerImg;
