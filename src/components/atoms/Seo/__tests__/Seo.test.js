import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import siteMetadata from '../../../../consts/siteMetadata';
import Seo from '../Seo';

// Seo renders bare <title>/<meta> elements for a Gatsby `Head` export, so it is
// asserted as markup. Rendering into a container is not usable here: React 19
// hoists document metadata out of the tree and into <head>, which would leave
// the container empty.
const markup = props => renderToStaticMarkup(<Seo {...props} />);

describe('Seo', () => {
	it('appends the site title to the page title', () => {
		expect(markup({ title: 'My Page' })).toContain(
			`<title>My Page | ${siteMetadata.title}</title>`
		);
	});

	it('does not duplicate the site title when it is already the whole title', () => {
		const html = markup({ title: 'My Page' });
		expect(html.match(/Damian Wr/g)).toHaveLength(
			// title + og:title + twitter:title, once each
			3
		);
	});

	it('falls back to the site description', () => {
		// renderToStaticMarkup escapes attribute values, so compare escaped.
		const escaped = siteMetadata.description.replace(/&/g, '&amp;');
		expect(markup({ title: 'My Page' })).toContain(
			`<meta name="description" content="${escaped}"/>`
		);
	});

	it('uses a custom description for both description and og:description', () => {
		const html = markup({ title: 'My Page', description: 'Custom' });
		expect(html).toContain('<meta name="description" content="Custom"/>');
		expect(html).toContain('<meta property="og:description" content="Custom"/>');
	});

	it('defaults og:image to the static preview image as an absolute URL', () => {
		expect(markup({ title: 'My Page' })).toContain(
			`<meta property="og:image" content="${siteMetadata.siteUrl}${siteMetadata.previewImage}"/>`
		);
	});

	it('makes a protocol-relative Contentful image absolute over https', () => {
		expect(
			markup({ title: 'My Page', image: '//images.ctfassets.net/abc/shot.png' })
		).toContain(
			'<meta property="og:image" content="https://images.ctfassets.net/abc/shot.png"/>'
		);
	});

	it('maps lang to an og:locale', () => {
		expect(markup({ title: 'My Page' })).toContain(
			'<meta property="og:locale" content="en_US"/>'
		);
		expect(markup({ title: 'My Page', lang: 'pl' })).toContain(
			'<meta property="og:locale" content="pl_PL"/>'
		);
	});

	it('renders extra meta passed by the caller', () => {
		expect(
			markup({ title: 'My Page', meta: [{ name: 'robots', content: 'noindex' }] })
		).toContain('<meta name="robots" content="noindex"/>');
	});

	it('keeps the google-site-verification token', () => {
		expect(markup({ title: 'My Page' })).toContain(
			`content="${siteMetadata.googleSiteVerification}"`
		);
	});
});
