import * as React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { delay } from "../../utils";
import { PasswordField } from "../shared/PasswordField";

export const SignUpForm = (props) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // delay operation in ms to show spinner
      await delay(1500);
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
        description: `${response?.data?.email} is created successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    } catch (err) {
      // show message
      toast({
        title: "Sign up Failed",
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
    <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack spacing="6">
        <FormControl id="fullName">
          <FormLabel>Full Name</FormLabel>
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
          <FormLabel>Email Address</FormLabel>
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
          colorScheme="blue"
          size="lg"
          fontSize="md"
          disabled={loading}
        >
          {loading ? <Spinner size="md" color="gray.100" /> : "Sign up"}
        </Button>
      </Stack>
    </chakra.form>
  );
};
