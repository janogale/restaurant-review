import * as React from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

import { useForm } from "react-hook-form";

import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function ReviewCard({ restuarantId }) {
  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // create new review
  async function createView(data) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "POST",
        url: "/api/restuarants/reviews",
        data: {
          ...data,
          restuarantId,
          authorId: "coming soon",
          rating,
          author: "Mukhtar Mahamed",
          createdAt: new Date().toGMTString(),
        },
        // headers: { "x-access-token": token },
      });

      reset();
      toast({
        title: "Review Created.",
        description: "successfully created new review",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Create Review",
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
      createView(data);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <VStack
      w="100%"
      align="center"
      bg="gray.50"
      justify="center"
      rounded="md"
      boxShadow="lg"
      px={4}
      py={2}
    >
      <chakra.form onSubmit={handleSubmit(onSubmit)} w="80%">
        <Stack spacing="3">
          <Flex>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={32}
              activeColor="#d69e2e"
            />
          </Flex>
          <FormControl id="comment">
            <FormLabel>Comment</FormLabel>
            <Textarea
              isInvalid={errors?.comment}
              autoComplete="text"
              {...register("comment", {
                required: "comment is required",
                minLength: {
                  value: 5,
                  message: "comment should be at lease 5 characters",
                },
              })}
            />
            <chakra.small color="red.600">
              {errors?.comment?.message}
            </chakra.small>
          </FormControl>
          <Button
            type="submit"
            size="sm"
            w="120px"
            variant="outline"
            disabled={loading}
            colorScheme="green"
          >
            {loading ? <Spinner size="md" color="red.500" /> : "Post Review"}
          </Button>
        </Stack>
      </chakra.form>
    </VStack>
  );
}
