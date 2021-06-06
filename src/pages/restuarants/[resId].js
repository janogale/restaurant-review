import useSWR from "swr";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import Skeleton from "../../components/restaurant/DetailsSkeleton";

import Detailedview from "../../components/restaurant/Detailedview";

// data fetcher
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function RestuarantDetailedView() {
  const router = useRouter();

  const { resId } = router.query;

  const { data, error } = useSWR(`/api/restuarants/${resId}`, fetcher);

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
      <Detailedview restuarant={data} />
    </Layout>
  );
}
