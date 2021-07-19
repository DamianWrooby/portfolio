import React, { useEffect } from 'react';
import Layout from '../layouts/layout';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import Seo from '../components/atoms/Seo/Seo';
import Technologies from '../components/organisms/Technologies/Technologies';
import Projects from '../components/organisms/Projects/Projects';
import Websites from '../components/organisms/Websites/Websites';
import Contact from '../components/organisms/Contact/Contact';
import Footer from '../components/molecules/Footer/Footer';
import NavigationProvider from '../contexts/NavigationContext';
import scrollTop from '../utils/scrollTop';

const IndexPage = () => {
	useEffect(() => {
		scrollTop();
	}, []);

	return (
		<NavigationProvider>
			<Layout>
				<Seo title="Portfolio programistyczne" lang="pl" />
				<Navigation lang="pl" />
				<Header lang="pl" />
				<main>
					<Technologies lang="pl" />
					<Projects lang="pl" />
					<Websites lang="pl" />
					<Contact lang="pl" />
				</main>
				<Footer lang="pl" />
			</Layout>
		</NavigationProvider>
	);
};

export default IndexPage;
