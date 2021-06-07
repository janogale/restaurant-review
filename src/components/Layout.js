import React from "react";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}
