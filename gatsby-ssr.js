// The Gatsby Head API cannot set attributes on <html>, so the document language
// is set here instead. It used to come from react-helmet's `htmlAttributes`.
//
// Language is derived from the URL because that is what gatsby-plugin-i18n
// encodes: Polish pages are prefixed `/pl/`, English is the unprefixed default
// (`prefixDefault: false`).
exports.onRenderBody = ({ pathname = '/', setHtmlAttributes }) => {
	// Match the `/pl` segment exactly, so a future path like `/planning/`
	// is not mistaken for Polish.
	const isPolish = pathname === '/pl' || pathname.startsWith('/pl/');
	setHtmlAttributes({ lang: isPolish ? 'pl' : 'en' });
};
