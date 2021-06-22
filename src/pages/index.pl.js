import React, { useEffect } from 'react';
import Layout from '../layouts/layout';
import Header from '../components/organisms/Header/Header';
import Navigation from '../components/organisms/Navigation/Navigation';
import Technologies from '../components/organisms/Technologies/Technologies';
import Projects from '../components/organisms/Projects/Projects';
import Websites from '../components/organisms/Websites/Websites';
import Contact from '../components/organisms/Contact/Contact';
import Footer from '../components/molecules/Footer/Footer';
import NavigationProvider from '../contexts/NavigationContext';

const IndexPage = () => {
	useEffect(() => {
		if (typeof window !== undefined) {
			window.scrollTo(0, 0);
		}
	}, []);

	return (
		<NavigationProvider>
			<Layout>
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
