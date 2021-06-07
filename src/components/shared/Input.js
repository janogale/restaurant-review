import React from "react";

import {
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { capitalize } from "./utils";

export default function InputContainer({
  name,
  label = name,
  type = "text",
  error = "",
  ...rest
}) {
  return (
    <FormControl id={name}>
      <FormLabel>{capitalize(label)}</FormLabel>
      <Input type={type} name={name} {...rest} isInvalid={!!error} />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
