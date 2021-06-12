import React from "react";
import axios from "axios";
import useSWR from "swr";
import { Flex } from "@chakra-ui/react";

import RestaurantList from "./RestuarantList";
import ListSkeleton from "./ListSkeleton";

// global state
import { AppState } from "../../context";

// data fetcher
const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export default function Index() {
  const { state } = AppState();
  const { data, error } = useSWR(
    ["/api/restuarants", state?.accessToken],
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (error)
    return <Flex justify="center">failed to load data, Please try again!</Flex>;
  if (!data)
    return (
      <div>
        <ListSkeleton />
      </div>
    );

  return (
    <>
      <RestaurantList restuarants={data} />
    </>
  );
}
