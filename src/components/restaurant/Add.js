import React from "react";

import { MdAdd } from "react-icons/md";
import { Button } from "@chakra-ui/react";

export default function AddRestuarant() {
  return (
    <Button leftIcon={<MdAdd />} colorScheme="green" variant="outline">
      Add Restaurant
    </Button>
  );
}
