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
} from "@chakra-ui/react";

import { BsThreeDots } from "react-icons/bs";

import { Card } from "../shared/Card";
import { Property } from "../shared/Property";
import { CardHeader } from "../shared/CardHeader";

export default function DetailedView({ restuarant = {} }) {
  return (
    <VStack align="start">
      <Flex width="100%" mb={4} justify="space-between" align="center" px={3}>
        <Card maxW="3xl" mx="auto" minW="80%">
          <CardHeader
            title="Restaurant Details"
            action={<Actions id={restuarant.id} />}
          />
          <Box>
            <Property label="Name" value={`${restuarant.name}`} />
            <Property label="Description" value={`${restuarant.description}`} />
            <Property
              label="Created at"
              value={new Date(restuarant.createdAt).toLocaleDateString("en-US")}
            />
            <Property label="Rating" value={4.5} />
          </Box>
        </Card>
      </Flex>
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

  const toast = useToast();
  const router = useRouter();

  // delete single employee by Id
  async function deleteRestaurant(restuarantId) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "DELETE",
        url: `/api/restuarants/${restuarantId}`,
        // headers: { "x-access-token": token },
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
