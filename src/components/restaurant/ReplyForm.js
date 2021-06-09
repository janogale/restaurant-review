import * as React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { ChatIcon } from "@chakra-ui/icons";

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

export default function ReplyForm({ restuarantId, reviewId }) {
  const [loading, setLoading] = React.useState(false);
  const [toggle, setToggle] = React.useState(true);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (toggle) {
    return (
      <Button
        onClick={() => setToggle(!toggle)}
        leftIcon={<ChatIcon />}
        variant="outline"
      >
        Reply
      </Button>
    );
  }

  // create new review
  async function createReply(data) {
    setLoading(true);
    // const token = state.token || window.sessionStorage.getItem("userToken");
    try {
      await axios({
        method: "POST",
        url: "/api/restuarants/replies",
        data: {
          ...data,
          restuarantId,
          author: "coming soon",
          reviewId,
          createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
        },
        // headers: { "x-access-token": token },
      });

      reset();
      toast({
        description: "successfully replied",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to Create Reply",
        description: "Sorry something went wrong, please try again",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      setLoading(false);
    }

    reset();
  }

  const onSubmit = (data) => {
    if (data) {
      createReply(data);
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
          <Flex justify="space-between" w="100%" align="center">
            <Text>
              Signed in as <chakra.strong>Mukhtar</chakra.strong>
            </Text>
            <Button
              alignSelf="flex-end"
              size="xs"
              w="100px"
              type="submit"
              variant="outline"
              disabled={loading}
              colorScheme="green"
            >
              {loading ? <Spinner size="sm" color="red.500" /> : "Reply"}
            </Button>
            <Button onClick={() => setToggle(!toggle)} size="xs">
              Dismiss
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </VStack>
  );
}
