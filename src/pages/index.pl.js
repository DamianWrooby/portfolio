import React, { useEffect } from "react";

import Seo from "../components/atoms/Seo/Seo";
import Footer from "../components/molecules/Footer/Footer";
import AboutMe from "../components/organisms/AboutMe/AboutMe";
import Contact from "../components/organisms/Contact/Contact";
import Header from "../components/organisms/Header/Header";
import Navigation from "../components/organisms/Navigation/Navigation";
import Projects from "../components/organisms/Projects/Projects";
import Technologies from "../components/organisms/Technologies/Technologies";
import Websites from "../components/organisms/Websites/Websites";
import NavigationProvider from "../contexts/NavigationContext";
import Layout from "../layouts/layout";
import scrollTop from "../utils/scrollTop";

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
					<AboutMe lang="pl" />
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
