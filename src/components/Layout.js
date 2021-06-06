import React from "react";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
}
