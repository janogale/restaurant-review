import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Flex
      justify="center"
      fontWeight="light"
      py={8}
      mt={16}
      borderTopWidth="2px"
      w="100%"
    >
      <Text>Restuarant Review App &copy; 2021</Text>
    </Flex>
  );
}
