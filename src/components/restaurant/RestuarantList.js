import React from "react";
import { useRouter } from "next/router";

import { Box, Flex, VStack, Heading } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "../shared/Table";

import AddRestuarant from "./AddModal";

export default function RestaurantList({ restuarants = {} }) {
  const router = useRouter();

  return (
    <VStack align="start">
      <Flex width="100%" mb={4} justify="space-between" align="center" px={3}>
        <Heading as="h2" fontSize="xl">
          Restaurants List
        </Heading>
        <Box>
          <AddRestuarant />
        </Box>
      </Flex>
      <Table width="100%">
        <thead>
          <Tr _hover={{}}>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Contact</Th>
            <Th>Rate</Th>
          </Tr>
        </thead>

        <tbody>
          {restuarants &&
            restuarants.map((res) => (
              <Tr
                key={res.id}
                onClick={() => router.push(`/restuarants/${res.id}`)}
              >
                <Td>{res.name}</Td>
                <Td>{res.description}</Td>
                <Td>{res.contact}</Td>
                <Td>{res.contact}</Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </VStack>
  );
}
