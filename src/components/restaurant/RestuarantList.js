import React from "react";

import {
  Box, Flex, VStack, Heading, FormControl, FormLabel, Select
} from "@chakra-ui/react";

import AddRestuarant from "./AddModal";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restuarants = {} }) {
  const [value, setValue] = React.useState("")
  const handleChange = (event) => {

    setValue(event.target.value)
    console.log(event.target.value)
  }

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
      {/* filter */}
      <Flex pb={6} >
        <FormControl id="country">
          <FormLabel>Filter By Average Rating</FormLabel>
          <Select placeholder="Rating" value={value} onChange={handleChange}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </Select>
        </FormControl>
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
