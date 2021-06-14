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


export default function MakeAdminModal({ email, label = '' }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = React.useState(false);

    const { state } = AppState()

    const toast = useToast();

    // delete single user by Id
    async function makeAdmin(email) {
        setLoading(true);

        const token = state?.accessToken || window.sessionStorage.getItem("accessToken");

        try {
            await axios({
                method: "PUT",
                url: `/api/users`,
                data: {
                    email: email
                },
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "set user as Admin",
                description: "successfully updated user",
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
            setLoading(false);
        }
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">{label}</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xs">
                <ModalOverlay />
                <ModalContent fontFamily="sm">
                    <ModalHeader>
                        Are you sure, you want set {email} as admin
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Cannel
                        </Button>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => makeAdmin(email)}
                        >
                            {loading ? <Spinner /> : "Accept"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
