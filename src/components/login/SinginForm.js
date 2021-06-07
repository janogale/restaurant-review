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

export const LoginFormAdmin = (props) => {
  const router = useRouter();
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
      const response = await axios.post("http://localhost:5000/api/signin", {
        ...data,
      });

      // show success message
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 1000,
      });
      setLoading(false);

      // store admin token into state

      // save token to sessionStorage
      window.sessionStorage.setItem("admintoken", response?.data?.token);

      // navigate to dashboard if login successfull
      router.push("/dashboard");
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
    <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack spacing="6">
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            isInvalid={errors?.username}
            autoComplete="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4,
                message: "Username should be at lease 4 characters",
              },
            })}
          />
          <chakra.small color="red.600">
            {errors?.username?.message}
          </chakra.small>
        </FormControl>
        <PasswordField
          id="adminPassword"
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
