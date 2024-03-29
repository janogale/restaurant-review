import React from "react";
import {
  Box,
  Skeleton,
  Table,
  Tr,
  Thead,
  Tbody,
  Th,
  Td,
} from "@chakra-ui/react";

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SiteTableSkeleton = () => (
  <Table>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
      </Tr>
    </Thead>
    <Tbody>
      <SkeletonRow width="75px" />
      <SkeletonRow width="125px" />
      <SkeletonRow width="50px" />
      <SkeletonRow width="100px" />
      <SkeletonRow width="75px" />
    </Tbody>
  </Table>
);

export default SiteTableSkeleton;
