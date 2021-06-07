import useSWR from "swr";
import { Box, Flex, Icon, HStack, VStack, Text } from "@chakra-ui/react";

import { BiBuildings } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";

// data fetcher
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ReviewCardContainer({ restuarantId }) {
  const { data, error } = useSWR(
    `/api/restuarants/reviews/${restuarantId}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (error) {
    return <Flex justify="center">failed to load data, Please try again!</Flex>;
  }

  const ReviewCards = data
    ? data.map((review) => (
        <Box key={review.id} w="100%">
          <ReviewCard review={review} restuarantId={restuarantId} />
        </Box>
      ))
    : null;

  return ReviewCards;
}

function ReviewCard({ review = {} }) {
  const {
    fullname = "Mukhtar Mahamed",
    rating = 0,
    comment = "",
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

        <Flex justify="flex-end" w="100%">
          <Flex>
            <Icon as={MdDelete} fontSize="md" />
          </Flex>
        </Flex>
      </VStack>
    </HStack>
  );
}
