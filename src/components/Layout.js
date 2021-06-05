import React from "react";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import RestaurantList from "./restaurant";

export default function Layout() {
  return (
    <Container>
      <Header />
      <Main>
        <RestaurantList />
      </Main>
    </Container>
  );
}
