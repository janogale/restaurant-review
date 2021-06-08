import React, { useRouter } from "next/router";

import { Box, Flex, Icon, HStack, VStack, Text } from "@chakra-ui/react";

import { BiBuildings } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default function RestaurantCard({ restuarant: res = {} }) {
  const router = useRouter();
  return (
    <HStack
      align="center"
      boxShadow="lg"
      mb={4}
      spacing={4}
      bg="gray.50"
      px={6}
      py={4}
      rounded="md"
      _hover={{
        bg: "gray.100",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/restuarants/${res.id}`)}
    >
      <Box alignSelf="start">
        <Icon as={BiBuildings} w={12} h={12} color="green.600" />
      </Box>
      <VStack w="100%" align="start">
        <Text fontSize="lg" fontWeight="bolder">
          {res.name}
        </Text>
        <Text>{res.description}</Text>
        <Flex justify="space-between" minW={40}>
          <Text>{res.contact}</Text>
          <Text>{res.contact}</Text>
        </Flex>
        <Flex justify="space-between" w="100%">
          {res?.rating && (
            <>
              <Text>
                Total Reviews <strong>{res.rating}</strong>
              </Text>
              <Flex>
                <Icon as={FaStar} fontSize="sm" />
                <Icon as={FaStar} fontSize="sm" />
                <Icon as={FaStar} fontSize="sm" />
                <Icon as={FaStar} fontSize="sm" />
              </Flex>
            </>
          )}
        </Flex>
      </VStack>
    </HStack>
  );
}
