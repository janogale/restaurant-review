import React from "react";
import axios from "axios";
import {
  Avatar,
  Flex,
  Text,
  Badge,
  VStack,
  Icon,
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
  useBoolean,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

// global state
import { AppState } from "../../context";

export default function Reply({ review }) {
  const { reply, restuarantId, id: reviewId } = review;

  const {state} = AppState();

  const {isAdmin, isOwner} = state;

  const [flag, setFlag] = useBoolean();
  if (!reply) return null;

  return (
    <VStack
      align="flex-start"
      fontSize="sm"
      pos="relative"
      boxShadow="md"
      p="3"
      w="80%"
      onMouseEnter={setFlag.on}
      onMouseLeave={setFlag.off}
    >
      <Flex>
        <Avatar name={reply?.author} src="#" size="sm" />
        <VStack spacing="0">
          <Text ml="3" fontWeight="bold">
            {reply?.author} <Badge colorScheme="green">{isAdmin ? 'Admin' : 'Author'} </Badge>
          </Text>
          <Text as="small">{reply.createdAt}</Text>
        </VStack>
      </Flex>
      <Text borderLeftWidth="2px" pl="3">
        {reply.reply}
      </Text>
      <Flex w="100%" pos="relative" mb={2}>
        {flag &&  (isAdmin || isOwner) && (
          <DeleteReplyModal reviewId={reviewId} restuarantId={restuarantId} />
        )}
      </Flex>
    </VStack>
  );
}

function DeleteReplyModal({ reviewId, restuarantId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);

  const { state } = AppState();

  const toast = useToast();

  // delete single employee by Id
  async function deleteReview() {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "DELETE",
        url: `/api/restuarants/replies`,
        data: {
          reviewId,
          restuarantId,
          uid: state?.uid,
        },
        headers: { Authorization: `Bearer ${state?.accessToken}` },
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
        onCloseComplete: () => {
          onClose();
        },
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Icon
        title="delete Reply"
        pos="absolute"
        top="-10"
        right="5"
        as={DeleteIcon}
        onClick={onOpen}
        _hover={{
          cursor: "pointer",
        }}
        w={3}
        h={3}
        color="red.600"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.600">Delete Reply ?</ModalHeader>
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
