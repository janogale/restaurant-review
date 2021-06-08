import React from "react";

import { Box, Flex, VStack, Heading } from "@chakra-ui/react";

import AddRestuarant from "./AddModal";
import RestaurantCard from "./RestaurantCard";

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
      <Box width="100%">
        {restuarants?.length ? (
          restuarants.map((restuarant) => (
            <Box key={restuarant.id}>
              <RestaurantCard restuarant={restuarant} />
            </Box>
          ))
        ) : (
          <Flex
            minH="20vh"
            justify="center"
            align="center"
            bg="gray.50"
            rounded="md"
            boxShadow="lg"
          >
            <Heading fontSize="xl">
              There are no Restuarants, please add now
            </Heading>
          </Flex>
        )}
      </Box>
    </VStack>
  );
}
