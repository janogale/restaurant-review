import * as React from "react";
import { useRouter } from "next/router";
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
import { AppState } from "../../context/index";

export const SignInForm = (props) => {
  const router = useRouter();
  const toast = useToast();

  // global state
  const { dispatch } = AppState();

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
        url: "/api/auth/signin",
        data: {
          ...data,
        },
      });

      const { details, claims, token } = response?.data;

      // save to data to global state
      dispatch({
        type: "login",
        payload: {
          accessToken: token,
          isLoggedIn: true,
          isAdmin: claims?.admin || false,
          isOwner: claims?.owner || false,
          email: details?.email,
          uid: details?.uid,
          fullName: details.fullName,
        },
      });

      // show success message
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 1000,
      });
      setLoading(false);

      // navigate to home if login successfull
      router.push("/home");
    } catch (err) {
      // show message
      toast({
        title: "Login Failed",
        description: "Username or password is incorrect",
        status: "error",
        duration: 3000,
      });
      setLoading(false);
    }

    // reset form

    reset();
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack spacing="6">
        <FormControl id="username">
          <FormLabel>Your Email</FormLabel>
          <Input
            type="email"
            placeholder="Type email"
            isInvalid={errors?.email}
            autoComplete="text"
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 4,
                message: "Username should be at lease 4 characters",
              },
            })}
          />
          <chakra.small color="red.600">{errors?.email?.message}</chakra.small>
        </FormControl>
        <PasswordField
          id="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 4,
              message: "password should be at lease 4 characters",
            },
          })}
        />
        <chakra.small color="red.600">{errors?.password?.message}</chakra.small>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          disabled={loading}
        >
          {loading ? <Spinner size="md" color="gray.100" /> : "Sign in"}
        </Button>
      </Stack>
    </chakra.form>
  );
};
