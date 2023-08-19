import React, { useEffect } from 'react';

import Seo from '../components/atoms/Seo/Seo';
import Footer from '../components/molecules/Footer/Footer';
import AboutMe from '../components/organisms/AboutMe/AboutMe';
import Contact from '../components/organisms/Contact/Contact';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import Projects from '../components/organisms/Projects/Projects';
import Technologies from '../components/organisms/Technologies/Technologies';
import Websites from '../components/organisms/Websites/Websites';
import NavigationProvider from '../contexts/NavigationContext';
import Layout from '../layouts/layout';

const IndexPage = () => {
	useEffect(() => {
		if (typeof window !== undefined && !window.location.href.includes('#')) {
			window.scrollTo(0, 0);
		}
	}, []);

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Programming portfolio" />
				<Navigation lang="en" />
				<Header lang="en" />
				<main>
					<AboutMe lang="en" />
					<Technologies lang="en" />
					<Projects lang="en" />
					<Websites lang="en" />
					<Contact lang="en" />
				</main>
				<Footer lang="en" />
			</Layout>
		</NavigationProvider>
	);
};

export default IndexPage;
