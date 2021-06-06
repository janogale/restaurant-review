import React from "react";
import axios from "axios";
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
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import Input from "../shared/Input";

export default function RestaurantForm({ onClose }) {
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // create new employee
  async function createRestaurant(data) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      const response = await axios({
        method: "POST",
        url: "/api/restuarants",
        data: {
          ...data,
          createdAt: new Date().toISOString(),
        },
        // headers: { "x-access-token": token },
      });

      reset();
      toast({
        title: "Restaurant Created.",
        description: "successfully created new Restaurant",
        status: "success",
        duration: 1500,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
        },
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to Create",
        description: "Sorry something went wrong, please try again",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }

    reset();
  }

  const onSubmit = (data) => {
    if (data) {
      createRestaurant(data);
    }
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
          <Button
            type="submit"
            variant="outline"
            colorScheme="green"
            disabled={loading}
          >
            {loading ? <Spinner color="red.400" /> : "Create"}
          </Button>
        </Flex>
      </chakra.form>
    </Box>
  );
}
