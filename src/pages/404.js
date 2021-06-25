import React from 'react';

import Layout from '../layouts/layout';
import Seo from '../components/atoms/Seo/Seo';

const NotFoundPage = () => (
	<Layout>
		<Seo title="404: Not found" />
		<h1>NOT FOUND</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
	</Layout>
);

export default NotFoundPage;
