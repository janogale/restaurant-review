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
        {restuarants &&
          restuarants.map((restuarant) => (
            <Box key={restuarant.id}>
              <RestaurantCard restuarant={restuarant} />
            </Box>
          ))}
      </Box>
    </VStack>
  );
}
