import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { PasswordField } from "./PasswordField";

export const SignUpForm = (props) => (
  <chakra.form
    onSubmit={(e) => {
      e.preventDefault(); // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <FormControl id="employeeEmail">
        <FormLabel>Email address</FormLabel>
        <Input
          name="employeeEmail"
          type="email"
          autoComplete="email"
          required
        />
      </FormControl>
      <PasswordField name="employeePassword" id="employeePassword" />
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Sign up
      </Button>
    </Stack>
  </chakra.form>
);
