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

import { AppState } from "../../context";
import Input from "../shared/Input";

// global state.

export default function RestaurantForm({ onClose }) {
  const [loading, setLoading] = React.useState(false);

  // state
  const { state } = AppState();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // create new restuarant
  async function createRestaurant(data) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "POST",
        url: "/api/restuarants",
        data: {
          ...data,
          ownerId: state?.uid,
          createdAt: new Date().toISOString(),
        },
        headers: { Authorization: `Bearer ${state?.accessToken}` },
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
    setLoading(false);
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
          <Input {...register("address")} name="address" />
          <Input
            {...register("city", { required: "city is required" })}
            error={errors?.city?.message}
          />
        </SimpleGrid>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            isInvalid={errors?.name?.description}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description of the Restaurant"
          />
          {errors?.description?.message && (
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
