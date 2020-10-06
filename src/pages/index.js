import React from "react";
import Layout from "../layouts/Layout";
import Header from "../components/organisms/Header/Header";
import Navigation from "../components/organisms/Navigation/Navigation";
import Technologies from "../components/organisms/Technologies/Technologies";
import Projects from "../components/organisms/Projects/Projects";
import Contact from "../components/organisms/Contact/Contact";
import NavigationProvider from "../contexts/NavigationContext";

const IndexPage = () => (
  <NavigationProvider>
    <Layout>
      <Navigation />
      <Header />
      <main>
        <Technologies />
        <Projects />
        <Contact />
      </main>
      {/* <Footer /> */}
    </Layout>
  </NavigationProvider>
);

export default IndexPage;
