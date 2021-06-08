import * as React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";

import {
  Button,
  chakra,
  FormControl,
  Textarea,
  Spinner,
  VStack,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";

export default function ReplyForm({ restuarantId }) {
  const [loading, setLoading] = React.useState(false);

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
          author: "Mukhtar Mahamed",
          createdAt: new Date().toISOString(),
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

  return (
    <VStack w="80%" align="center" justify="center">
      <chakra.form onSubmit={handleSubmit(onSubmit)} w="80%">
        <VStack justify="flex-end">
          <FormControl id="comment">
            <Textarea
              placeholder="Type your reply"
              isInvalid={errors?.reply}
              autoComplete="text"
              {...register("reply", {
                required: "reply is required",
              })}
            />
            <chakra.small color="red.600">
              {errors?.reply?.message}
            </chakra.small>
          </FormControl>
          <Flex justify="space-between" w="100%">
            <Text>
              Signed in as <chakra.strong>Mukhtar</chakra.strong>
            </Text>
            <Button
              alignSelf="flex-end"
              size="xs"
              w="100px"
              variant="outline"
              disabled={loading}
              colorScheme="green"
            >
              {loading ? <Spinner size="sm" color="red.500" /> : "Reply"}
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </VStack>
  );
}
