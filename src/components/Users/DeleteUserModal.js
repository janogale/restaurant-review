import React from "react";
import axios from "axios";
import {
    Spinner,
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

import { AppState } from "../../context";


export default function DeleteUserModal({ uid }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = React.useState(false);

    const { state } = AppState()

    const toast = useToast();


    // delete single user by Id
    async function deletUser(uid) {
        setLoading(true);

        const token = state?.accessToken || window.sessionStorage.getItem("accessToken");

        try {
            await axios({
                method: "DELETE",
                url: `/api/auth/users/${uid}`,
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "User Deleted",
                description: "successfully Deleted user",
                status: "success",
                duration: 1000,
                isClosable: true,

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
            <Button onClick={onOpen} colorScheme="red">Delete</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xs">
                <ModalOverlay />
                <ModalContent fontFamily="sm"> 
                    <ModalHeader color="red.600">
                        Are you sure, you want to delete user
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Cannel
                        </Button>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => deletUser(uid)}
                        >
                            {loading ? <Spinner /> : "Delete"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
