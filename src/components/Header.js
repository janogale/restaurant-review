import { Flex, Link, Avatar, Icon, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { MdRateReview } from "react-icons/md";

export default function Layout() {
  return (
    <HStack justify="space-between" bg="gray.200" width="100%" px={8} py={3}>
      <Flex>
        <Icon as={MdRateReview} w={8} h={8} color="green.600" />
        <Link
          href="/"
          ml={4}
          fontSize="3vh"
          fontWeight="bold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Restaurant Review App
        </Link>
      </Flex>
      <Flex align="center">
        <Text mr={3}>Accounts</Text>
        <Link href="/">
          <Avatar size="sm" src="https://bit.ly/broken-link" />
        </Link>
      </Flex>
    </HStack>
  );
}
