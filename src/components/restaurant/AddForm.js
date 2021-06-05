import React from "react";
// import axios from "axios";
import { useForm } from "react-hook-form";
import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Spinner,
} from "@chakra-ui/react";

import Input from "../shared/Input";

export default function EmployeeForm({ onClose }) {
  const [loading, setLoading] = React.useState(false);

  // destructure employee object
  // if no value is passed set empty string as default

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   // create new employee
  //   async function createEmployee(data) {
  //     setLoading(true);
  //     const token = state.token || window.sessionStorage.getItem("admintoken");
  //     try {
  //       const response = await axios({
  //         method: "post",
  //         url: "http://localhost:5000/api/admin",
  //         data: {
  //           ...data,
  //         },
  //         headers: { "x-access-token": token },
  //       });

  //       console.log(response);
  //       reset();
  //       toast({
  //         title: "Employee Created.",
  //         description: "One Account created successfully",
  //         status: "success",
  //         duration: 2000,
  //         isClosable: true,
  //         onCloseComplete: () => {
  //           router.reload();
  //         },
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       toast({
  //         title: "Failed to Create",
  //         description: "Sorry something went wrong, please try again",
  //         status: "info",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //       console.log(error);
  //     }

  //     reset();
  //   }

  const onSubmit = (data) => {
    // update or create by checking isUpdate variable
    console.log(data);
  };

  return (
    <Box>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={2} spacing={3}>
          <Input
            {...register("name", { required: "name is required" })}
            name="name"
            error={errors?.name?.message}
          />

          <Input {...register("contact")} name="contact" />
        </SimpleGrid>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            isInvalid={errors?.name?.description}
            {...register("description", {
              required: "description is required",
            })}
            placeholder="Description of the Restaurant"
          />
          {errors?.name?.description && (
            <FormHelperText color="red">
              {errors?.description?.message}
            </FormHelperText>
          )}
        </FormControl>
        <Flex justify="space-around" my={4}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="outline" colorScheme="green">
            {loading ? <Spinner size="md" color="red.400" /> : "Create"}
          </Button>
        </Flex>
      </chakra.form>
    </Box>
  );
}
