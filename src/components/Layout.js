import React from "react";
import Head from 'next/head'
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Container>
    <Head>
        <title>Restuarant Review App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}
