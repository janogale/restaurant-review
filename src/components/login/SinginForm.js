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
import { PasswordField } from "./PasswordField";
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          ...data,
        }
      );

      const { token, claims } = response?.data;

      // save to data to global state
      dispatch({
        type: "login",
        payload: {
          accessToken: token,
          isLoggedIn: true,
          email: claims?.email || "",
          isAdmin: claims?.admin || false,
          isOwner: claims?.owner || false,
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
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
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
          {...register("password", { required: "password is required" })}
        />
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          disabled={loading}
        >
          {loading ? <Spinner size="md" color="red.500" /> : "Sign in"}
        </Button>
      </Stack>
    </chakra.form>
  );
};
