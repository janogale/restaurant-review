import React from "react";

import {
  Box, Flex, Button, VStack, Heading, FormControl, FormLabel, Select
} from "@chakra-ui/react";

import AddRestuarant from "./AddModal";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restuarants = {} }) {
  const [value, setValue] = React.useState("")
  const [data, setData] = React.useState(restuarants);

  const handleChange = (event) => {

    if (!event?.target?.value) return;

    setValue(event.target.value)

    const filteredData = restuarants.filter(res => {

      let average = Math.round(res.rating / res.ratingCount)

      // get no review restuarants
      if(res.rating === 0) average = 0;

      return average == event.target.value

    })
    setData(filteredData)
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
      <Flex pb={6} minW="20%" align="center">
        <FormControl id="country" >
          <FormLabel>Filter By Rating</FormLabel>
          <Select placeholder="Rating" value={value} onChange={handleChange}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
            <option value={0}>0</option>
          </Select>
        </FormControl>
        <Button onClick={() => setData(restuarants)} mt={3} ml={6} variant="ghost">Clear filter</Button>
      </Flex>
      <Box width="100%">
        {data?.length ? (
          data.map((restuarant) => (
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
