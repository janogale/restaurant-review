import React from "react";
import { useRouter } from "next/router";
import { Flex, Spinner } from "@chakra-ui/react";
import { AppState } from "../context";
import Layout from "../components/Layout";
import RestaurantList from "../components/restaurant";

// global state

const Index = () => {
  const router = useRouter();
  const { state } = AppState();

console.log('home rendered')
  React.useEffect(() => {
    // if not logged in redirect to login page
    if (!state?.isLoggedIn) {
      router.push("/");
    }
  });

  // loading page
  if (!state?.isLoggedIn) {
    return (
      <Layout>
        <Flex minH="50vh" justify="center" align="center">
          <Spinner />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <RestaurantList />
    </Layout>
  );
};

export default Index;
