import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import { Flex,Heading, Text, Button } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import Skeleton from "../../components/restaurant/DetailsSkeleton";

import UsersContainer from "../../components/Users";

// global state
import { AppState } from "../../context";


// data fetcher
const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export default function Users() {
  const router = useRouter();
  const { state } = AppState();


  const { data, error } = useSWR(
    [`/api/users`, state?.accessToken],
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  React.useEffect(() => {
    // if not logged in redirect to login page
    // if (!state?.isLoggedIn) {
    //   router.push("/");
    // }
  });

  if (error) {
    return (<Layout>
        <Heading as="h2" fontSize="lg">Manage Users</Heading>
      <Flex justify="center"  direction="column" justify="center" align="center" boxShadow="sm" p={6}>
        <Button>Go Back</Button>
        <Text>You don't have access &#x1F6D1; only admins can manage users</Text>
      </Flex>;
    </Layout>)
  }

  if (!data) {
    return (
      <Layout>
        <Skeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <UsersContainer users={data} />
    </Layout>
  );
}
