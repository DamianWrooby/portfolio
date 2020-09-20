import React from "react";
import Layout from "../layouts/layout";
import SEO from "../components/atoms/Seo/Seo";
import Header from "../components/organisms/Header/Header";
import Navigation from "../components/organisms/Navigation/Navigation";
import Technologies from "../components/organisms/Technologies/Technologies";
import NavigationProvider from "../contexts/NavigationContext";

const IndexPage = () => (
  <NavigationProvider>
    <Layout>
      <SEO title="Home" />
      <Navigation />
      <Header />
      <main>
        <Technologies />
      </main>
      {/* <Footer /> */}
    </Layout>
  </NavigationProvider>
);

export default IndexPage;
