import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
    Flex, Heading, Button, VStack, chakra, FormControl,
    Spinner,
    useToast,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";
import Input from "../shared/Input";
import { PasswordField } from "../shared/PasswordField";

import UsersCard from "./UsersCard"


export default function UserContainer({ users }) {

    return (
        <VStack align="flex-start" spacing="6">
            <Flex justify="space-between" w="100%">
                <Heading as="h2" fontSize="lg">Manage Users</Heading>
                <AddUserModal />
            </Flex>
            <UsersCard users={users} />
        </VStack>)
}




// Add userModal

function AddUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <Button
                onClick={onOpen}
                leftIcon={<MdAdd />}
                colorScheme="green"
                variant="outline"
            >
                Add User
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Restaurant</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddUserForm onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


function AddUserForm({ onClose }) {
    const toast = useToast();
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();



    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // delay operation in ms to show spinner
            const response = await axios({
                method: "POST",
                url: "/api/auth/signup",
                data: {
                    ...data,
                },
            });

            // show success message
            toast({
                title: "Signup Successfull",
                description: "email is created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    onClose()
                }
            });
            setLoading(false);
        } catch (err) {
            // show message
            toast({
                title: "Failed to Create user",
                description: "Please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });

            setLoading(false);
        }
        // reset form
        reset();
    };

    return (
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
                <FormControl id="fullName">
                    <Input
                        placeholder="Type your full name"
                        isInvalid={errors?.email}
                        autoComplete="text"
                        {...register("fullName", {
                            required: "fullname is required",
                            minLength: {
                                value: 6,
                                message: "Full Name should be at lease 6 characters",
                            },
                        })}
                    />
                    <chakra.small color="red.600">
                        {errors?.fullName?.message}
                    </chakra.small>
                </FormControl>
                <FormControl id="email">
                    <Input
                        type="email"
                        placeholder="Type email"
                        isInvalid={errors?.email}
                        autoComplete="text"
                        {...register("email", {
                            required: "Email is required",
                            minLength: {
                                value: 4,
                                message: "Email should be at lease 4 characters",
                            },
                        })}
                    />
                    <chakra.small color="red.600">{errors?.email?.message}</chakra.small>
                </FormControl>
                <PasswordField
                    id="singuppassword"
                    {...register("password", {
                        required: "password is required",
                        minLength: {
                            value: 4,
                            message: "Password should be at lease 4 characters",
                        },
                    })}
                />
                <chakra.small color="red.600">{errors?.password?.message}</chakra.small>

                <Button
                    type="submit"
                    colorScheme="green"
                    size="md"
                    fontSize="md"
                    disabled={loading}
                >
                    {loading ? <Spinner size="md" color="gray.100" /> : "Add"}
                </Button>
            </Stack>
        </chakra.form>
    );
};
