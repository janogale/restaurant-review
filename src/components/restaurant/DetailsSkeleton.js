import React from "react";
import { Box, Skeleton, Text } from "@chakra-ui/react";

const SkeletonRow = ({ width }) => (
  <Box justify="center">
    <Skeleton height="10px" w={width} my={4} />
    <Skeleton height="10px" w={width} my={4} />
  </Box>
);

const DetailedViewSkeleton = () => (
  <Box>
    <Text fontWeight="bold">Restuarant Details</Text>
    <SkeletonRow width="70%" />
    <SkeletonRow width="50%" />
    <SkeletonRow width="85%" />
  </Box>
);

export default DetailedViewSkeleton;
