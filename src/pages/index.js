import React from "react";
import Layout from "../layouts/layout";
import SEO from "../components/seo";
import Header from "../components/organisms/Header/Header";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Navigation />
    <Header />
    {/* <main>
      Main content
    </main> */}
    {/* <Footer /> */}
  </Layout>
);

export default IndexPage;
