import React from "react";
import useSWR from "swr";
import RestaurantList from "./List";
import ListSkeleton from "./ListSkeleton";

// data fetcher
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const { data, error } = useSWR("/api/restuarants", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <ListSkeleton />
      </div>
    );

  return (
    <>
      <RestaurantList data={data} />
    </>
  );
}
