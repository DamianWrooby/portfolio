import React from "react";
import Layout from "../layouts/layout";
import SEO from "../components/atoms/Seo/Seo";
import Header from "../components/organisms/Header/Header";
import Navigation from "../components/organisms/Navigation/Navigation";
import Technologies from "../components/organisms/Technologies/Technologies";
import Projects from "../components/organisms/Projects/Projects";
import NavigationProvider from "../contexts/NavigationContext";

const IndexPage = () => (
  <NavigationProvider>
    <Layout>
      <SEO title="Damian Wróblewski - Front-end web developer" />
      <Navigation />
      <Header />
      <main>
        <Technologies />
        <Projects />
      </main>
      {/* <Footer /> */}
    </Layout>
  </NavigationProvider>
);

export default IndexPage;
