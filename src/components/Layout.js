import { Text } from "@chakra-ui/react";
import React from "react";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";

export default function Layout() {
  return (
    <Container>
      <Header />
      <Main>
        <Text>Bismilaah</Text>
      </Main>
    </Container>
  );
}
