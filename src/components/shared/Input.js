import React from "react";

import {capitalize} from "./utils"
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function InputContainer({ name, label = name, type = "text", error='',  ...rest }) {
  return (
    <FormControl id={name}>
      <FormLabel>{capitalize(label)}</FormLabel>
      <Input type={type} name={name} {...rest}  isInvalid={!!error}/>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}


