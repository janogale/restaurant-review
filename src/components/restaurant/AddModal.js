import React from "react";

import { MdAdd } from "react-icons/md";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import RestaurantAddForm from "./AddForm";

export default function AddFormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = React.useRef();

  return (
    <>
      <Button
        ref={finalRef}
        onClick={onOpen}
        leftIcon={<MdAdd />}
        colorScheme="green"
        variant="outline"
      >
        Add Restaurant
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RestaurantAddForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
