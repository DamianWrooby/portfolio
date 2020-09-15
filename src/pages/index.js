import React from "react";
import Layout from "../layouts/layout";
import SEO from "../components/atoms/Seo/Seo";
import Header from "../components/organisms/Header/Header";
import Navigation from "../components/organisms/Navigation/Navigation";
import Technologies from "../components/organisms/Technologies/Technologies";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Navigation />
    <Header />
    <main>
      <Technologies />
    </main>
    {/* <Footer /> */}
  </Layout>
);

export default IndexPage;
