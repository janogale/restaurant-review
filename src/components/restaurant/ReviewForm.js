import * as React from "react";
// import axios from "axios";
import { useForm } from "react-hook-form";

import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function ReviewCard() {
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    try {
      // show success message
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 1000,
      });
      setLoading(false);

      // store admin token into state

      // save token to sessionStorage
    } catch (err) {
      console.log(err);

      // show message
      toast({
        title: "Login Failed",
        description: "Username or password is incorrect",
        status: "error",
        duration: 2000,
      });
      setLoading(false);
    }

    // reset form

    reset();
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
