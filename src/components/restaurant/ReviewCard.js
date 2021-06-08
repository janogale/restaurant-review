import React from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Box,
  Flex,
  Icon,
  HStack,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Spinner,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

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

function ReviewCard({ review = {}, restuarantId }) {
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
            <DeleteReviewModal
              reviewId={review.id}
              restuarantId={restuarantId}
            />
          </Flex>
        </Flex>
      </VStack>
    </HStack>
  );
}

function DeleteReviewModal({ reviewId, restuarantId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  // delete single employee by Id
  async function deleteReview() {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "DELETE",
        url: `/api/restuarants/reviews/`,
        data: {
          reviewId,
          restuarantId,
        },
        // headers: { "x-access-token": token },
      });

      toast({
        title: "Review Deleted.",
        description: "successfully Delete Restaurant",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
        },
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to Delete",
        description: "Sorry something went wrong, please try again",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(error);
    }
  }

  return (
    <>
      <Icon as={MdDelete} onClick={onOpen} fontSize="md" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.600">Delete Review ?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Cannel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => deleteReview()}
            >
              {loading ? <Spinner /> : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
