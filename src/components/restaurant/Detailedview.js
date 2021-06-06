import {
  Flex,
  VStack,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { BsThreeDots } from "react-icons/bs";

import React from "react";
import { Card } from "../shared/Card";
import { Property } from "../shared/Property";
import { CardHeader } from "../shared/CardHeader";

export default function DetailedView({ restuarant = {} }) {
  return (
    <VStack align="start">
      <Flex width="100%" mb={4} justify="space-between" align="center" px={3}>
        <Card maxW="3xl" mx="auto" minW="80%">
          <CardHeader title="Restaurant Details" action={<Actions />} />
          <Box>
            <Property label="Name" value={`${restuarant.name}`} />
            <Property label="Description" value={`${restuarant.description}`} />
            <Property
              label="Created at"
              value={new Date(restuarant.createdAt).toLocaleDateString("en-US")}
            />
            <Property label="Rating" value={4.5} />
          </Box>
        </Card>
      </Flex>
    </VStack>
  );
}

function Actions() {
  return (
    <Menu>
      <MenuButton>
        <Icon as={BsThreeDots} />
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
