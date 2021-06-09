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
  Avatar,
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
  Divider,
  useBoolean,
} from "@chakra-ui/react";

import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import ReplyForm from "./ReplyForm";
import Reply from "./ReplyCard";

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
  const [flag, setFlag] = useBoolean();
  const {
    fullname = "user coming",
    rating = 0,
    comment = "",
    createdAt = "",
  } = review;

  return (
    <HStack
      align="center"
      w="100%"
      boxShadow="sm"
      rounded="md"
      bg="gray.50"
      mb={3}
      spacing={2}
      px={4}
      py={3}
      _hover={{
        boxShadow: "lg",
      }}
      onMouseEnter={setFlag.on}
      onMouseLeave={setFlag.off}
    >
      <Box alignSelf="start">
        <Avatar name={fullname} src="#" size="sm" />
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

        <VStack w="100%">
          <Flex w="100%" pos="relative" mb={2}>
            {flag && (
              <DeleteReviewModal
                reviewId={review.id}
                rating={review.rating}
                restuarantId={restuarantId}
              />
            )}
          </Flex>
          <Divider />
          {review.reply ? <Reply reply={review?.reply} /> : <ReplyForm />}
        </VStack>
      </VStack>
    </HStack>
  );
}

function DeleteReviewModal({ reviewId, restuarantId, rating }) {
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
          rating,
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
      // console.log(error);
    }
  }

  return (
    <>
      <Icon
        title="delete review"
        pos="absolute"
        top="-10"
        right="5"
        as={MdDelete}
        onClick={onOpen}
        _hover={{
          cursor: "pointer",
        }}
        w={5}
        h={5}
        color="red.600"
      />
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
