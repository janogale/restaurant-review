import useSWR from "swr";
import { useRouter } from "next/router";
import { Flex, Button, Text, Divider } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
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
      <Flex align="center">
        <Button onClick={() => router.back()} leftIcon={<ChevronLeftIcon />}>
          Back
        </Button>
        <Text ml={["3rem", "5rem"]} fontWeight="light" fontSize="xl">
          Restuarant Details
        </Text>
      </Flex>
      <Divider />
      {/* restuarant details */}
      <Detailedview restuarant={data} />
    </Layout>
  );
}
