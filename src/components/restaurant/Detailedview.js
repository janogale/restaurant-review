import { Flex, VStack, Heading } from "@chakra-ui/react";
import React from "react";

export default function DetailedView({ restuarant = {} }) {
  return (
    <VStack align="start">
      <Flex width="100%" mb={4} justify="space-between" align="center" px={3}>
        <Heading as="h2" fontSize="xl">
          {restuarant.name}
        </Heading>
      </Flex>
    </VStack>
  );
}
