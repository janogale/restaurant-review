import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Detailedview from "../../components/restaurant/Detailedview";

export default function RestuarantDetailedView() {
  const router = useRouter();
  const { resId } = router.query;

  return (
    <Layout>
      <Detailedview restuarant={{ name: "caramel" }} />
    </Layout>
  );
}
