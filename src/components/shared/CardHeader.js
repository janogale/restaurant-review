import { Flex, Heading } from "@chakra-ui/react";

export const CardHeader = (props) => {
  const { title, action } = props;
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      bg="green.100"
      borderBottomWidth="1px"
    >
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  );
};