import React, { useRouter } from "next/router";

import { Box, Flex, Icon, HStack, VStack, Text } from "@chakra-ui/react";

import { BiBuildings } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review = {} }) {
  const router = useRouter();

  const {
    fullname = "Mukhtar Mahamed",
    rating = 4,
    comment = "this is amazing restaurant",
    createdAt = "1 Jun 2021 18:53:18",
  } = review;

  return (
    <HStack
      align="center"
      boxShadow="md"
      w="100%"
      mb={3}
      spacing={2}
      bg="gray.50"
      px={4}
      py={3}
      rounded="md"
      _hover={{
        bg: "gray.100",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/review/${review.id}`)}
    >
      <Box alignSelf="start">
        <Icon as={BiBuildings} w={12} h={12} color="green.600" />
      </Box>
      <VStack w="100%" align="start">
        <Text fontSize="md" fontWeight="bolder">
          {fullname}
        </Text>
        <Flex>
          <Box>
            {Array(rating)
              .fill(rating)
              .map((val, index) => (
                <Icon key={val + index} as={FaStar} fontSize="sm" />
              ))}
          </Box>
          <Text ml="1.5rem">{createdAt}</Text>
        </Flex>
        <Text>{comment}</Text>

        <Flex justify="space-between" w="100%">
          <Text>
            Total Reviews <strong>24</strong>
          </Text>
          <Flex>
            <Icon as={MdDelete} fontSize="md" />
          </Flex>
        </Flex>
      </VStack>
    </HStack>
  );
}
