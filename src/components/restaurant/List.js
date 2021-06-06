import {
  Box,
  Flex,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
} from "@chakra-ui/react";
import React from "react";

import AddRestuarant from "./AddModal";

export default function RestaurantList({ restuarants = {} }) {
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
      <Box width="100%" p={3}>
        <Table bg="gray.50" boxShadow="md">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Date Created</Th>
              <Th isNumeric>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {restuarants &&
              restuarants.map((res, index) => (
                <Tr key={index}>
                  <Td>
                    <Link href="/">{res.name}</Link>
                  </Td>
                  <Td>{res.description}</Td>
                  <Td>{res.contact}</Td>
                  <Td isNumeric>{res.contact}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}
