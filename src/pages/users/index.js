import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import Skeleton from "../../components/restaurant/DetailsSkeleton";

import UsersContainer from "../../components/users/";

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
    [`/api/auth/users`, state?.accessToken],
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

    console.log(data)
  });

  if (error) {
    return <Flex justify="center">failed to load data, Please try again!</Flex>;
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
    <UsersContainer users={data}/>
    </Layout>
  );
}
