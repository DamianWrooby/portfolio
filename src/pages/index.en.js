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
				<Navigation lang="en" />
				<Header lang="en" />
				<main>
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
