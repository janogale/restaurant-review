import { Avatar, Flex, Text, Badge, VStack, Icon } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

export default function Reply({ reply }) {
  if (!reply) return null;

  return (
    <VStack
      align="flex-start"
      fontSize="sm"
      pos="relative"
      boxShadow="md"
      p="3"
      w="80%"
    >
      <Icon as={BsThreeDots} pos="absolute" right="5" />
      <Flex>
        <Avatar name={reply?.author} src="#" size="sm" />
        <VStack spacing="0">
          <Text ml="3" fontWeight="bold">
            {reply?.author} <Badge colorScheme="green">Admin</Badge>
          </Text>
          <Text as="small">{reply.createdAt}</Text>
        </VStack>
      </Flex>
      <Text borderLeftWidth="2px" pl="3">
        {reply.reply}
      </Text>
    </VStack>
  );
}
