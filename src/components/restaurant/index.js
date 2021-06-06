import { Flex } from "@chakra-ui/layout";
import React from "react";
import useSWR from "swr";
import RestaurantList from "./List";
import ListSkeleton from "./ListSkeleton";

// data fetcher
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR("/api/restuarants", fetcher, {
    refreshInterval: 1000,
  });

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
