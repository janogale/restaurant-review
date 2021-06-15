import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Flex,
  VStack,
  Box,
  Icon,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Heading,
  Divider,
} from "@chakra-ui/react";

import { BsThreeDots } from "react-icons/bs";

import { Card } from "../shared/Card";
import { Property } from "../shared/Property";
import { CardHeader } from "../shared/CardHeader";
import ReviewCardContainer from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import AverageRating from "./AverageRating";
import { AppState } from "../../context";



export default function DetailedView({ restuarant = {} }) {

  const { state } = AppState()
  const { isAdmin, isOwner } = state;

  return (
    <VStack align="start">
      <Flex width="100%" mb={4} justify="space-between" align="center">
        <Card mx="auto" boxShadow="xl" width="100%">

          <CardHeader
            title={`${restuarant.name}`}
            action={isAdmin ? <Actions id={restuarant.id} /> : null}
          />

          <Box>
            <Property label="Description" value={`${restuarant.description}`} />
            <Property
              label="Created at"
              value={new Date(restuarant.createdAt).toLocaleDateString("en-US")}
            />
            <Property label="City" value={restuarant.city} />
            <Property label="Contact" value={restuarant.contact} />
            <Property
              label="Total Reviews"
              value={restuarant.ratingCount}
            />
            <Property
              label="Average Rating"
              value={
                <AverageRating
                  ratingCount={restuarant.ratingCount}
                  totalRating={restuarant.rating}
                />
              }
            />
          </Box>
        </Card>
      </Flex>
      <Flex>
        <Heading as="h3" my={3} fontSize="lg" fontWeight="normal">
          Reviews for {restuarant.name}{" "}
        </Heading>
      </Flex>
      {/* restaurant review */}
      <ReviewForm restuarantId={restuarant.id} />
      <Divider my={3} />
      <ReviewCardContainer restuarantId={restuarant.id} />
    </VStack>
  );
}

function Actions({ id }) {
  return (
    <Menu>
      <MenuButton>
        <Icon as={BsThreeDots} />
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        <DeleteModal id={id} />
      </MenuList>
    </Menu>
  );
}

function DeleteModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);

  const { state } = AppState()

  const toast = useToast();
  const router = useRouter();

  // delete single employee by Id
  async function deleteRestaurant(restuarantId) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");

    const token = state?.accessToken || window.sessionStorage.getItem("accessToken");


    try {
      await axios({
        method: "DELETE",
        url: `/api/restuarants/${restuarantId}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Restaurant Delete.",
        description: "successfully Delete Restaurant",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
          router.back();
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
      setLoading(false);
    }
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Delete</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.600">
            Are you sure, you want to delete
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Cannel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => deleteRestaurant(id)}
            >
              {loading ? <Spinner /> : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
